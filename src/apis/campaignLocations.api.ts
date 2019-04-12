import { CampaignImages } from "./campaignImages.api";

export interface ICampaignLocation {
  title: string;
  subtitle: string;
  imagesrc: string;
  description: string;
}

const locations: ICampaignLocation[] = [
  {
    title: "Ahmberg",
    subtitle: "Town Center",
    imagesrc: CampaignImages.getImages()[3],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
    
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`
  },
  {
    title: "Wailing Cave",
    subtitle: "Cave Entrance",
    imagesrc: CampaignImages.getImages()[5],
    description: ''
  }
];

export const CampaignLocations = {
  getLocations: () => locations
};
