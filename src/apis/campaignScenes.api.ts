import _ from "lodash";
import { PB_SCENE_TYPES } from "src/constants/campaign.constants";

export interface ICampaignScene {
  key: number;
  sceneType: string;
  mood?: {
    backgroundOverlay: string
  }
  region?: number;
  sector?: number;
  space?: number;
}

export interface ICharacterScene extends ICampaignScene {
  characters: any[];
}

const scenes: ICampaignScene[] = [
  {
    key: 1,
    sceneType: PB_SCENE_TYPES.REGION,
    mood: {
      backgroundOverlay: 'rgba(144, 193, 195, 0.1)'
    },
    region: 1
  },
  {
    key: 2,
    sector: 2,
    mood: {
      backgroundOverlay: 'rgba(144, 193, 195, 0.2)'
    },
    sceneType: PB_SCENE_TYPES.SECTOR
  }
];

export const CampaignScenes = {
  getScenes: () => scenes
};
