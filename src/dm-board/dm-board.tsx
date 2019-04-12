import * as React from "react";
// @ts-ignore

import { CampaignMessenger } from "src/playboard/campaignManager.service";
import { DmBoardImagePicker } from "./components/dm-board-img-picker";
import { DmViewManager } from "./components/viewManager/dm-view-manager";
import "./dm-board.scss";
interface IDmBoardState {
  showBackgroundImagePicker: boolean;
  backgroundImage: string;
}

export class DmBoard extends React.Component<any, IDmBoardState, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      showBackgroundImagePicker: false,
      backgroundImage: CampaignMessenger.getCurrentBackgroundImage()
    };
  }

  public showBackgroundImagePicker(): void {
    if (!this.state.showBackgroundImagePicker) {
      this.setState({ showBackgroundImagePicker: true });
    }
  }

  public hideBackgroundImagePicker(): void {
    if (this.state.showBackgroundImagePicker) {
      this.setState({ showBackgroundImagePicker: false });
    }
  }

  public componentDidMount(): void {
    CampaignMessenger.getBackgroundImage().subscribe(
      (backgroundImage: string) => {
        this.setState({ backgroundImage });
      }
    );
  }

  public render() {
    return (
      <div className="dm-board">
        <div
          className="dm-board-image"
          onClick={this.showBackgroundImagePicker.bind(this)}
          style={{ backgroundImage: `url(${this.state.backgroundImage} )` }}
        >
          {this.state.showBackgroundImagePicker && (
            <DmBoardImagePicker
              onClosed={this.hideBackgroundImagePicker.bind(this)}
            />
          )}
        </div>
        <div>
          <DmViewManager />
        </div>
      </div>
    );
  }
}
