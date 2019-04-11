import { Subject } from "rxjs";

const image = new Subject();
const overlay = new Subject();

export const CampaignMessenger = {
  setBackgroundImage: (src: any) => image.next(src),
  getBackgroundImage: () => image.asObservable(),

  setBackgroundOverlay: (color: {
    rgb: { r: number; b: number; g: number; a: number };
  }) =>
    overlay.next(
      `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
    ),
  getBackgroundOverlay: () => overlay.asObservable()
};
