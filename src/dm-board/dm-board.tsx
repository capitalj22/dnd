import * as React from "react";
// @ts-ignore
import { SketchPicker } from "react-color";
import { CampaignImages } from "src/apis/campaignImages.api";
import { CampaignMessenger } from "src/playboard/campaignManager.service";
import "./dm-board.scss";

interface IDmBoardState {
  backgroundImages: string[];
  selectedImage: string;
}

export class DmBoard extends React.Component<any, IDmBoardState, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      backgroundImages: CampaignImages.getImages(),
      selectedImage: ""
    };
  }

  public componentDidMount(): void {
    //
  }

  public updateBackgroundImage(src: string): void {
    CampaignMessenger.setBackgroundImage(src);
    // console.log(e.currentTarget.value);
  }

  public updateColor(color: any): void {
    CampaignMessenger.setBackgroundOverlay(color);
  }

  public render() {
    return (
      <div>
        This is where the DM does stuff
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
        <SketchPicker onChange={this.updateColor} />
      </div>
    );
  }
}
