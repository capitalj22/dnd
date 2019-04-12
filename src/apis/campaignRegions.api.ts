import { CampaignImages } from "./campaignImages.api";

export interface ICampaignRegion {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imagesrc: string;
}

const regions = [
  {
    id: 1,
    title: "The Warbling Vale",
    subtitle: "Eastern Fehrlon",
    description: "...",
    imagesrc: CampaignImages.getImages()[0]
  },
  {
    id: 2,
    title: "The Steppes of Dariahl",
    subtitle: "Eastern Fehrlon",
    description: "...",
    imagesrc: CampaignImages.getImages()[1]
  }
];

export const CampaignRegions = {
  getRegions: () => regions
};
