import { filter, find } from "lodash";
import { CampaignImages } from "./campaignImages.api";

export interface ICampaignSpace {
  key: number;
  region: number;
  sector: number;
  title: string;
  subtitle: string;
  imagesrc: string;
  description: string;
}

const spaces: ICampaignSpace[] = [
  {
    key: 1,
    region: 1,
    sector: 0,
    title: "Ahmberg",
    subtitle: "Town Center",
    imagesrc: CampaignImages.getImages()[9],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
    
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`
  },
  {
    key: 2,
    region: 1,
    sector: 1,
    title: "Ahmberg",
    subtitle: "Town Center",
    imagesrc: CampaignImages.getImages()[11],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
    
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`
  },
  {
    key: 3,
    region: 1,
    sector: 1,
    title: "Ahmberg",
    subtitle: "Town Center",
    imagesrc: CampaignImages.getImages()[12],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
    
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`
  },
  {
    key: 4,
    region: 1,
    sector: 2,
    title: "Wailing Cave",
    subtitle: "Cave Entrance",
    imagesrc: CampaignImages.getImages()[4],
    description: ""
  },
  {
    key: 5,
    region: 1,
    sector: 2,
    title: "Wailing Cave",
    subtitle: "Cave Entrance",
    imagesrc: CampaignImages.getImages()[6],
    description: ""
  },
  {
    key: 6,
    region: 2,
    sector: 4,
    title: "Wailing Cave",
    subtitle: "Cave Entrance",
    imagesrc: CampaignImages.getImages()[12],
    description: ""
  }
];

export const CampaignSpaces = {
  getSpaces: () => spaces,
  getSpace: (key: number) => find(spaces, { key }),
  getSpacesBySector: (sectorKey: number) =>
    filter(spaces, { sector: sectorKey })
};
