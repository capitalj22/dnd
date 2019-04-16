import { filter, find } from "lodash";
import { CampaignImages } from "./campaignImages.api";

export interface ICampaignSector {
  region: number;
  key: number;
  title: string;
  subtitle: string;
  imagesrc: string;
  description: string;
}

const sectors: ICampaignSector[] = [
  {
    key: 1,
    region: 1,
    title: "Ahmberg",
    subtitle: "Town Center",
    imagesrc: CampaignImages.getImages()[3],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
    
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`
  },
  {
    key: 2,
    region: 1,
    title: "Wailing Cave",
    subtitle: "Cave Entrance",
    imagesrc: CampaignImages.getImages()[5],
    description: ""
  },
  {
    key: 3,
    region: 1,
    title: "Castle Ahm",
    subtitle: "",
    imagesrc: CampaignImages.getImages()[10],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
    
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`
  },
  {
    key: 4,
    region: 2,
    title: "Monastery",
    subtitle: "Cave Entrance",
    imagesrc: CampaignImages.getImages()[8],
    description: ""
  },
];

export const CampaignSectors = {
  getSectors: () => sectors,
  getSector: (key: number) => find(sectors, { key }),
  getSectorsByRegion: (regionKey: number) =>
    filter(sectors, { region: regionKey })
};
