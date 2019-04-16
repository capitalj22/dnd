import { BehaviorSubject, Observable, Subject } from "rxjs";
import { CampaignImages } from "src/apis/campaignImages.api";
import { CampaignRegions, ICampaignRegion } from "src/apis/campaignRegions.api";
import { ICampaignScene } from "src/apis/campaignScenes.api";
import {
  CampaignSectors,
  ICampaignSector
} from "src/apis/campaignSectors.api";
import { rx } from './baseManager.service';



const image = new BehaviorSubject(CampaignImages.getImages()[0]);
const overlay = new Subject();
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
  view: {
    getView: () => playerBoardView.asObservable(),
    setView: (view: string) => playerBoardView.next(view)
  }
};

export const viewManager = {
  viewType: rx(new BehaviorSubject("default")),
  backgroundImage: rx(new BehaviorSubject(""))
};

export const LocationManager = {
  region: rx<ICampaignRegion>(
    new BehaviorSubject(CampaignRegions.getRegions()[0])
  ),
  location: rx<ICampaignSector>(
    new BehaviorSubject(CampaignSectors.getSectors()[0])
  ),
  scene: rx<ICampaignScene>(new BehaviorSubject({} as any))
};

export const LocationService = {
  updateLocation: (location: ICampaignSector) => {
    LocationManager.location.set(location);

    if (viewManager.viewType.current() === "default") {
      viewManager.backgroundImage.set(
        LocationManager.region.current().imagesrc
      )
    }
  }
};