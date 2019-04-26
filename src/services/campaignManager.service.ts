import { BehaviorSubject } from "rxjs";
import { rx } from "./baseManager.service";

const playerBoardView = new BehaviorSubject("location");

export const CampaignMessenger = {
  view: {
    getView: () => playerBoardView.asObservable(),
    setView: (view: string) => playerBoardView.next(view)
  }
};

export const viewManager = {
  viewType: rx(new BehaviorSubject("default")),
  backgroundImage: rx(new BehaviorSubject(""))
};
