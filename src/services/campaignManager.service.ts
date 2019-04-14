import { BehaviorSubject, Subject } from "rxjs";
import { CampaignImages } from "src/apis/campaignImages.api";
import {
  CampaignLocations,
  ICampaignLocation
} from "src/apis/campaignLocations.api";

const image = new BehaviorSubject(CampaignImages.getImages()[0]);
const overlay = new Subject();
const campaignLocation = new BehaviorSubject(
  CampaignLocations.getLocations()[0]
);
const playerBoardView = new BehaviorSubject("location");

export const CampaignMessenger = {
  setBackgroundImage: (src: any) => image.next(src),
  getBackgroundImage: () => image.asObservable(),
  getCurrentBackgroundImage: () => image.getValue(),

  setBackgroundOverlay: (color: {
    rgb: { r: number; b: number; g: number; a: number };
  }) =>
    overlay.next(
      `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
    ),
  getBackgroundOverlay: () => overlay.asObservable(),
  location: {
    setLocation: (location: ICampaignLocation) =>
      campaignLocation.next(location),
    getLocation: () => campaignLocation.asObservable(),
    getCurrentLocation: () => campaignLocation.getValue()
  },
  view: {
    getView: () => playerBoardView.asObservable(),
    setView: (view: string) => playerBoardView.next(view)
  }
};
