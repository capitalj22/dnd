import { PB_VIEW_TYPES } from "src/common/campaign.constants";
import { CampaignLocations, ICampaignLocation } from "./campaignLocations.api";
import { CampaignRegions, ICampaignRegion } from "./campaignRegions.api";

export interface ICampaignScene {
  id: number;
  sceneType: string;
  region: ICampaignRegion;
  location?: ICampaignLocation;
}

export interface ICharacterScene extends ICampaignScene {
  characters: any[];
}

const preloadedCampaignScenes: ICampaignScene[] = [
  {
    id: 1,
    sceneType: PB_VIEW_TYPES.REGION,
    region: CampaignRegions.getRegions()[0]
  },
  {
    id: 2,
    sceneType: PB_VIEW_TYPES.LOCATION,
    region: CampaignRegions.getRegions()[0],
    location: CampaignLocations.getLocations()[0]
  }
];

export const CampaignScenes = {
  getScenes: () => preloadedCampaignScenes,
  addScene: (scene: ICampaignScene) => {
    preloadedCampaignScenes.push(scene);
  }
};
