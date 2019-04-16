import { BehaviorSubject } from "rxjs";
import { ICampaignRegion } from "src/apis/campaignRegions.api";
import { CampaignScenes, ICampaignScene } from "src/apis/campaignScenes.api";
import { rx } from "./baseManager.service";

export interface ILocation {
  region?: number;
  sector?: number;
  space?: number;
}

const scene$ = rx(
  new BehaviorSubject<ICampaignScene>(CampaignScenes.getScenes()[0])
);

export const SceneManager = {
  scene: scene$,
  updateScene: (newScene: ICampaignScene) => {
    scene$.set(newScene);
  },
  updateRegion: (region: number) => {
    scene$.set({ ...scene$.current(), region });
  },
  updateLocation: (location: ILocation) => {
    scene$.set({
      ...scene$.current(),
      region: location.region,
      sector: location.sector,
      space: location.space
    });
  }
};
