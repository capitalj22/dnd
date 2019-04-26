import { assign } from "lodash";
import { BehaviorSubject } from "rxjs";
import { CampaignRegions } from "src/apis/campaignRegions.api";
import { CampaignScenes, ICampaignScene } from "src/apis/campaignScenes.api";
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

class Scene {
  public scene: Rx<ICampaignScene>;

  constructor(scene: Rx<ICampaignScene>) {
    this.scene = scene;
  }

  public updateScene(newScene: ICampaignScene) {
    this.scene.set(newScene);
  }

  public updateLocation(location: ILocation) {
    this.scene.set({
      ...this.scene.current(),
      region: location.region
        ? CampaignRegions.getRegion(location.region)
        : undefined,
      sector: location.sector
        ? CampaignSectors.getSector(location.sector)
        : undefined,
      space: location.space
        ? CampaignSpaces.getSpace(location.space)
        : undefined
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
}

export const SceneManager = new Scene(scene$);

export const ScenePreviewManager = new Scene(scenePreview$);
