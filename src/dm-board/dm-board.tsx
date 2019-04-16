import * as React from "react";
// @ts-ignore
import ReactModal from "react-modal";

import { JxButton } from "src/common/button/jx-button";
import { CampaignMessenger } from "src/services/campaignManager.service";
import { DmLocationSelect } from "./components/sceneManager/locations/dm-location-select";
import { DmRegionSelect } from "./components/sceneManager/locations/dm-region-select";
import "./dm-board.scss";

const SCENE_MODAL_VIEWS = {
  SELECT_REGION: "select-region",
  SELECT_LOCATION: "select-location"
};

interface IDmBoardState {
  showSceneManager: boolean;
  sceneModalView: string;
  backgroundImage: string;
}

export class DmBoard extends React.Component<any, IDmBoardState, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      showSceneManager: false,
      sceneModalView: SCENE_MODAL_VIEWS.SELECT_REGION,
      backgroundImage: CampaignMessenger.getCurrentBackgroundImage()
    };
  }

  public toggleSceneManager(on: boolean, view: string) {
    if (this.state.showSceneManager !== on) {
      this.setState({
        showSceneManager: on,
        sceneModalView: view
      });
    }
  }

  public componentDidMount(): void {
    CampaignMessenger.getBackgroundImage().subscribe(
      (backgroundImage: string) => {
        this.setState({ backgroundImage });
      }
    );
  }

  public setRegion(region: any): void {
    console.log(region, "region");
  }

  public render() {
    return (
      <div className="dm-board">
        <ReactModal
          isOpen={this.state.showSceneManager}
          onRequestClose={this.toggleSceneManager.bind(this, false)}
        >
          {this.state.sceneModalView === SCENE_MODAL_VIEWS.SELECT_LOCATION && (
            <DmLocationSelect />
          )}
          {this.state.sceneModalView === SCENE_MODAL_VIEWS.SELECT_REGION && (
            <DmRegionSelect onSelect={this.setRegion.bind(this)} />
          )}
        </ReactModal>
        <div className="dm-board-options">
          <div className="dm-board-option">
            <JxButton icon="Map" style="square" />
            <div className="dm-board-option-flyout">
              <JxButton
                label="Region"
                icon="Truck"
                onClick={this.toggleSceneManager.bind(
                  this,
                  true,
                  SCENE_MODAL_VIEWS.SELECT_REGION
                )}
              />
              <JxButton
                label="Location"
                icon="Truck"
                onClick={this.toggleSceneManager.bind(
                  this,
                  true,
                  SCENE_MODAL_VIEWS.SELECT_LOCATION
                )}
              />
              <JxButton label="New" icon="Plus" />
            </div>
          </div>
          <div className="dm-board-option">
            <JxButton icon="User" style="square" />
            <div className="dm-board-option-flyout" />
          </div>
        </div>
      </div>
    );
  }
}
