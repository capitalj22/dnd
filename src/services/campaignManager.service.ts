import { BehaviorSubject, Observable, Subject } from "rxjs";
import { CampaignImages } from "src/apis/campaignImages.api";
import {
  CampaignLocations,
  ICampaignLocation
} from "src/apis/campaignLocations.api";
import { CampaignRegions, ICampaignRegion } from "src/apis/campaignRegions.api";
import { ICampaignScene } from "src/apis/campaignScenes.api";

const rx = <T extends {}>(observable: BehaviorSubject<T>) => ({
  current: () => observable.getValue(),
  get: () => observable.asObservable(),
  set: (thing: T) => observable.next(thing)
});

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
  location: rx<ICampaignLocation>(
    new BehaviorSubject(CampaignLocations.getLocations()[0])
  ),
  scene: rx<ICampaignScene>(new BehaviorSubject({} as any))
};

export const LocationService = {
  updateLocation: (location: ICampaignLocation) => {
    LocationManager.location.set(location);

    if (viewManager.viewType.current() === "default") {
      viewManager.backgroundImage.set(
        LocationManager.region.current().imagesrc
      )
    }
  }
};
