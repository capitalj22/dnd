import { filter, find } from "lodash";
import { CampaignImages } from "./campaignImages.api";

export interface ICampaignSpace {
  key: number;
  sector: number;
  title: string;
  subtitle: string;
  imagesrc: string;
  description: string;
}

const spaces: ICampaignSpace[] = [
  {
    key: 1,
    sector: 1,
    title: "Inn",
    subtitle: "Ahmberg Tavern",
    imagesrc: CampaignImages.images.inn1,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
    
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`
  },
  {
    key: 2,
    sector: 1,
    title: "Ahmberg",
    subtitle: "Town Center",
    imagesrc: CampaignImages.getImages()[11],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
    
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`
  },
  {
    key: 3,
    sector: 2,
    title: "Castle Grounds",
    subtitle: "",
    imagesrc: CampaignImages.getImages()[10],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
    
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`
  },
  {
    key: 4,
    sector: 3,
    title: "Wailing Cave",
    subtitle: "Cave Entrance",
    imagesrc: CampaignImages.getImages()[4],
    description: ""
  },
  {
    key: 5,
    sector: 3,
    title: "Wailing Cave",
    subtitle: "Cave Entrance",
    imagesrc: CampaignImages.getImages()[6],
    description: ""
  },
  {
    key: 6,
    sector: 3,
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
