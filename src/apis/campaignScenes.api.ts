import _ from 'lodash';
import { PB_VIEW_TYPES } from "src/common/campaign.constants";
import { CampaignLocations, ICampaignLocation } from "./campaignLocations.api";
import { CampaignRegions, ICampaignRegion } from "./campaignRegions.api";

export interface ICampaignScene {
  key: number;
  sceneType: string;
  region: ICampaignRegion;
  location?: ICampaignLocation;
}

export interface ICharacterScene extends ICampaignScene {
  characters: any[];
}

const preloadedCampaignScenes: ICampaignScene[] = [
  {
    key: 1,
    sceneType: PB_VIEW_TYPES.REGION,
    region: CampaignRegions.getRegions()[0]
  },
  {
    key: 2,
    sceneType: PB_VIEW_TYPES.LOCATION,
    region: CampaignRegions.getRegions()[0],
    location: CampaignLocations.getLocations()[0]
  }
];

export const CampaignScenes = {
  getScenes: () => preloadedCampaignScenes,
  getScenesByRegion: (region: ICampaignRegion) => _.filter(preloadedCampaignScenes, (scene) => 
    scene.region.key === region.key
  ), 
  addScene: (scene: ICampaignScene) => {
    preloadedCampaignScenes.push(scene);
  }
};
