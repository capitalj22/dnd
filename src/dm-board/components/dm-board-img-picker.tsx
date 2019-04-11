import * as React from "react";
// @ts-ignore
import { SketchPicker } from "react-color";
import { CheckCircle, Droplet } from "react-feather";
import { CampaignImages } from "src/apis/campaignImages.api";
import { CampaignMessenger } from 'src/playboard/campaignManager.service';
interface DmBoardImagePickerState {
  activeImage: string;
  images: string[];
  color: any;
  showColorPicker: boolean;
}

export class DmBoardImagePicker extends React.Component<
  any,
  DmBoardImagePickerState,
  any
> {
  constructor(props: any) {
    super(props);

    this.state = {
      images: CampaignImages.getImages(),
      activeImage: "",
      color: {},
      showColorPicker: false
    };
  }

  public updateBackgroundImage(src: string): void {
    CampaignMessenger.setBackgroundImage(src);
  }

  public updateColor(color: any): void {
    CampaignMessenger.setBackgroundOverlay(color);
    this.setState({ color: color.rgb });
  }

  public openColorPicker(): void {
    if (!this.state.showColorPicker) {
      this.setState({ showColorPicker: true });
    }
  }

  public closeColorPicker(): void {
    this.setState({ showColorPicker: false });
  }

  public render() {
    return <div>
        {this.state.showColorPicker && (
            <div className="dm-color-picker-container">
              <SketchPicker
                color={this.state.color || {}}
                className="dm-color-picker"
                onChange={(color: any) => this.updateColor(color)}
              />
              <div className="dm-color-picker-complete" onClick={e => this.closeColorPicker()}>
                <CheckCircle color="white" size={12} />
              </div>
            </div>
          )}
    </div>;
  }
}
