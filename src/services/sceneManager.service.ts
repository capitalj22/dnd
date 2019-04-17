import { BehaviorSubject } from "rxjs";
import { CampaignRegions, ICampaignRegion } from "src/apis/campaignRegions.api";
import { CampaignScenes, ICampaignScene } from "src/apis/campaignScenes.api";
import { CampaignSectors } from "src/apis/campaignSectors.api";
import { CampaignSpaces } from "src/apis/campaignSpaces.api";
import { rx } from "./baseManager.service";

export interface ILocation {
  region?: number | null;
  sector?: number | null;
  space?: number | null;
}

const scene$ = rx(
  new BehaviorSubject<ICampaignScene>(CampaignScenes.getScenes()[0])
);

export const SceneManager = {
  scene: scene$,
  updateScene: (newScene: ICampaignScene) => {
    scene$.set(newScene);
  },
  updateLocation: (location: ILocation) => {
    scene$.set({
      ...scene$.current(),
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
  },
  updateMood: (mood: any) => {
    scene$.set({
      ...scene$.current(),
      mood: {
        backgroundOverlay: mood.backgroundOverlay
      }
    })
  }
};
