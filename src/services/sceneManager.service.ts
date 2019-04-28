import { BehaviorSubject } from "rxjs";
import { CampaignRegions } from "src/apis/campaignRegions.api";
import {
  CampaignScenes,
  ICampaignScene,
  ICampaignSceneLayout,
  ICampaignSceneLayoutLocationType
} from "src/apis/campaignScenes.api";
import { CampaignSectors } from "src/apis/campaignSectors.api";
import { CampaignSpaces } from "src/apis/campaignSpaces.api";
import { rx, Rx } from "./baseManager.service";

export interface ILocation {
  region?: number | null;
  sector?: number | null;
  space?: number | null;
}

const scene$ = rx(
  new BehaviorSubject<ICampaignScene>(CampaignScenes.getScenes()[0])
);

const scenePreview$ = rx(
  new BehaviorSubject<ICampaignScene>(CampaignScenes.getScenes()[0])
);


// TODO manage side effects

export class Scene {
  public scene: Rx<ICampaignScene>;

  constructor(scene: Rx<ICampaignScene>) {
    this.scene = scene;
  }

  public updateScene(newScene: ICampaignScene) {
    this.scene.set(newScene);
  }

  public updateLocation(location: ILocation) {
    const newLocation = {
      region: location.region
        ? CampaignRegions.getRegion(location.region)
        : undefined,
      sector: location.sector
        ? CampaignSectors.getSector(location.sector)
        : undefined,
      space: location.space
        ? CampaignSpaces.getSpace(location.space)
        : undefined
    };

    this.scene.set({
      ...this.scene.current(),
      ...newLocation
    });

    this.scene.set({
      ...this.scene.current(),
      layout: {
        ...this.scene.current().layout,
        backgroundSrc: this.getLayoutBackground()
      }
    });
  }

  public updateMood(mood: any) {
    this.scene.set({
      ...this.scene.current(),
      mood
    });
  }

  public updateWeather(weather: string) {
    this.scene.set({
      ...this.scene.current(),
      weather
    });
  }

  public getLayoutBackground(): string {
    const scene = this.scene.current();

    if (scene.space && scene.sector) {
      if (scene.layout.locationType === "overview") {
        return scene.space.imagesrc;
      } else {
        return scene.sector.imagesrc;
      }
    } else if (scene.sector && scene.region) {
      if (scene.layout.locationType === "overview") {
        return scene.sector.imagesrc;
      } else {
        return scene.region.imagesrc;
      }
    } else if (scene.region) {
      return scene.region.imagesrc;
    } else {
      return "";
      // use generic background image ??
    }
  }

  public updateLayoutBackground() {
    const scene = this.scene.current();
    scene.layout.backgroundSrc = this.getLayoutBackground();

    this.scene.set(scene);
  }

  public updateLocationType(locationType: ICampaignSceneLayoutLocationType) {
    const newScene = this.scene.current();
    newScene.layout.locationType = locationType;

    this.scene.set(newScene);
    this.updateLayoutBackground();
  }

  public updateLayout(layout: ICampaignSceneLayout) {
    const scene = this.scene.current();

    this.scene.set({
      ...scene,
      layout: {
        ...layout,
        backgroundSrc: this.getLayoutBackground()
      }
    });
  }
}

export const SceneManager = new Scene(scene$);

export const ScenePreviewManager = new Scene(scenePreview$);
