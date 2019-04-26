import _ from "lodash";
import { PB_SCENE_TYPES } from "src/constants/campaign.constants";
import { blendMode } from 'src/playboard/moodOverlay/mood-overlay';
import { CampaignRegions, ICampaignRegion } from "./campaignRegions.api";
import { CampaignSectors, ICampaignSector } from "./campaignSectors.api";
import { ICampaignSpace } from "./campaignSpaces.api";

export interface ICampaignScene {
  key: number;
  sceneType: string;
  mood?: {
    backgroundOverlay: string;
    overlayType: blendMode;
  };
  weather: string;
  region?: ICampaignRegion;
  sector?: ICampaignSector;
  space?: ICampaignSpace;
}

export interface ICharacterScene extends ICampaignScene {
  characters: any[];
}

const scenes: ICampaignScene[] = [
  {
    key: 1,
    sceneType: PB_SCENE_TYPES.REGION,
    mood: {
      backgroundOverlay: "rgba(144, 193, 195, 0.1)",
      overlayType: "color"
    },
    weather: "sun",
    region: CampaignRegions.getRegions()[0],
    sector: CampaignSectors.getSectors()[0]
  }
];

export const CampaignScenes = {
  getScenes: () => scenes
};
