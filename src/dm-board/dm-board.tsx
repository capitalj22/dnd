import * as React from "react";
// @ts-ignore
import { SketchPicker } from "react-color";
import { CheckCircle, Droplet } from "react-feather";

import { CampaignImages } from "src/apis/campaignImages.api";
import { CampaignMessenger } from "src/playboard/campaignManager.service";
import "./dm-board.scss";
interface IDmBoardState {
  lastColor: any;
  backgroundImages: string[];
  selectedImage: string;
  showColorPicker: boolean;
}

export class DmBoard extends React.Component<any, IDmBoardState, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      lastColor: null,
      backgroundImages: CampaignImages.getImages(),
      selectedImage: "",
      showColorPicker: false
    };
  }

  public componentDidMount(): void {
    //
  }

  public updateBackgroundImage(src: string): void {
    CampaignMessenger.setBackgroundImage(src);
  }

  public updateColor(color: any): void {
    CampaignMessenger.setBackgroundOverlay(color);
    this.setState({ lastColor: color.rgb });
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
    return (
      <div className="dm-board">
        <div className="dm-board-images">
          {this.state.backgroundImages &&
            this.state.backgroundImages.map(image => (
              <div
                onClick={e => this.updateBackgroundImage(image)}
                className="dm-board-image"
                style={{ backgroundImage: `url(${image} )` }}
              />
            ))}
        </div>
        <div className="dm-color-btn" onClick={e => this.openColorPicker()}>
          {" "}
          <Droplet />
          {this.state.showColorPicker && (
            <div className="dm-color-picker-container">
              <SketchPicker
                color={this.state.lastColor || {}}
                className="dm-color-picker"
                onChange={(color: any) => this.updateColor(color)}
              />
              <div className="dm-color-picker-complete" onClick={e => this.closeColorPicker()}>
                <CheckCircle color="white" size={12} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
