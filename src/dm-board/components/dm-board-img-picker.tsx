import * as React from "react";
// @ts-ignore
import { SketchPicker } from "react-color";
import { CheckCircle, Droplet } from "react-feather";
import { CampaignImages } from "src/apis/campaignImages.api";
import { CampaignMessenger } from "src/playboard/campaignManager.service";

import "../dm-board.scss";

interface DmBoardImagePickerState {
  activeImage: string;
  images: string[];
  color: any;
  showColorPicker: boolean;
  presetColors: any[];
}

interface DmBoardImagePickerProps {
  onClosed: any;
}

export class DmBoardImagePicker extends React.Component<
  DmBoardImagePickerProps,
  DmBoardImagePickerState,
  any
> {
  constructor(props: any) {
    super(props);

    this.state = {
      images: CampaignImages.getImages(),
      activeImage: "",
      color: {},
      showColorPicker: false,
      presetColors: []
    };
  }

  public updateBackgroundImage(src: string): void {
    CampaignMessenger.setBackgroundImage(src);
  }

  public updateColor(color: any): void {
    CampaignMessenger.setBackgroundOverlay(color);
    this.setState({ color });
  }

  public openColorPicker(): void {
    if (!this.state.showColorPicker) {
      this.setState({ showColorPicker: true });
    }
  }

  public closeColorPicker(): void {
    this.setState({ showColorPicker: false });
    this.setState({ presetColors: [...this.state.presetColors, this.state.color.hex]})
  }

  public closeSelf(): void {
    console.log("close self");
    this.props.onClosed();
  }

  public render() {
    return (
      <div className="dm-board-image-picker">
        <div className="dm-board-images">
          {this.state.images &&
            this.state.images.map(image => (
              <div
                onClick={e => this.updateBackgroundImage(image)}
                className="dm-board-image"
                style={{ backgroundImage: `url(${image} )` }}
              />
            ))}
        </div>
        <div className="dm-color-btn" onClick={e => this.openColorPicker()}>
          <Droplet />
          {this.state.showColorPicker && (
            <div className="dm-color-picker-container">
              <SketchPicker
                color={(this.state.color && this.state.color.rgb) || {}}
                className="dm-color-picker"
                presetColors={this.state.presetColors}
                onChange={(color: any) => this.updateColor(color)}
              />
              <div
                className="dm-color-picker-complete"
                onClick={e => this.closeColorPicker()}
              >
                <CheckCircle color="white" size={12} />
              </div>
            </div>
          )}
        </div>
        <div onClick={this.closeSelf.bind(this)}>
          <CheckCircle />
        </div>
      </div>
    );
  }
}
