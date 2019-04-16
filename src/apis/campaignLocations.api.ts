import { filter, find } from "lodash";
import { CampaignImages } from "./campaignImages.api";

export interface ICampaignLocation {
  region: number;
  key: number;
  title: string;
  subtitle: string;
  imagesrc: string;
  description: string;
}

const locations: ICampaignLocation[] = [
  {
    key: 0,
    region: 1,
    title: "Ahmberg",
    subtitle: "Town Center",
    imagesrc: CampaignImages.getImages()[3],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
    
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`
  },
  {
    key: 1,
    region: 1,
    title: "Wailing Cave",
    subtitle: "Cave Entrance",
    imagesrc: CampaignImages.getImages()[5],
    description: ""
  },
  {
    key: 2,
    region: 1,
    title: "Ahmberg",
    subtitle: "Town Center",
    imagesrc: CampaignImages.getImages()[6],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
    
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`
  },
  {
    key: 3,
    region: 1,
    title: "Wailing Cave",
    subtitle: "Cave Entrance",
    imagesrc: CampaignImages.getImages()[7],
    description: ""
  },
  {
    key: 4,
    region: 1,
    title: "Ahmberg",
    subtitle: "Town Center",
    imagesrc: CampaignImages.getImages()[8],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
    
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`
  },
  {
    key: 5,
    region: 2,
    title: "Wailing Cave",
    subtitle: "Cave Entrance",
    imagesrc: CampaignImages.getImages()[9],
    description: ""
  },
  {
    key: 6,
    region: 2,
    title: "Ahmberg",
    subtitle: "Town Center",
    imagesrc: CampaignImages.getImages()[10],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
    
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`
  },
  {
    key: 7,
    region: 2,
    title: "Wailing Cave",
    subtitle: "Cave Entrance",
    imagesrc: CampaignImages.getImages()[11],
    description: ""
  }
];

export const CampaignLocations = {
  getLocations: () => locations,
  getLocation: (key: number) => find(locations, { key }),
  getLocationsByRegion: (regionKey: number) =>
    filter(locations, { region: regionKey })
};
