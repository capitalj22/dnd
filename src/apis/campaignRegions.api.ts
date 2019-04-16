import { find } from "lodash";
import { CampaignImages } from "./campaignImages.api";

export interface ICampaignRegion {
  key: number;
  title: string;
  subtitle: string;
  description: string;
  imagesrc: string;
}

const regions: ICampaignRegion[] = [
  {
    key: 1,
    title: "The Warbling Vale",
    subtitle: "Eastern Fehrlon",
    description: "...",
    imagesrc: CampaignImages.getImages()[0]
  },
  {
    key: 2,
    title: "The Steppes of Dariahl",
    subtitle: "Eastern Fehrlon",
    description: "...",
    imagesrc: CampaignImages.getImages()[1]
  }
];

export const CampaignRegions = {
  getRegions: () => regions,
  getRegion: (key: number) => find(regions, { key })
};
