import * as React from "react";
// @ts-ignore
import ReactModal from "react-modal";

import { CampaignRegions, ICampaignRegion } from "src/apis/campaignRegions.api";
import { CampaignSectors, ICampaignSector } from "src/apis/campaignSectors.api";
import { JxButton } from "src/common/button/jx-button";
import {
  CampaignMessenger,
  LocationManager
} from "src/services/campaignManager.service";
import { DmRegionSelect } from "./components/sceneManager/locations/dm-region-select";
import { DmSectorSelect } from "./components/sceneManager/locations/dm-sector-select";
import { DmSceneManager } from "./components/sceneManager/sceneCreator/dm-scene-creator";
import "./dm-board.scss";

const SCENE_MODAL_VIEWS = {
  SELECT_REGION: "select-region",
  SELECT_LOCATION: "select-location",
  MANAGE_SCENE: "manage-scene"
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

  public closeModal() {
    this.setState({
      showSceneManager: false
    });
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

  public setRegion(regionKey: number): void {
    LocationManager.region.set(CampaignRegions.getRegion(
      regionKey
    ) as ICampaignRegion);

    this.closeModal();
  }

  public setLocation(locationKey: any): void {
    // extract to service
    const location = CampaignSectors.getSector(locationKey) as ICampaignSector;

    if (location) {
      this.setRegion(location.region);
      LocationManager.location.set(location);
    }

    this.closeModal();
  }

  public render() {
    return (
      <div className="dm-board">
        <ReactModal
          style={{
            content: {
              backgroundColor: "#00000022"
            },
            overlay: {
              backgroundColor: "#00000000"
            }
          }}
          isOpen={this.state.showSceneManager}
          onRequestClose={this.toggleSceneManager.bind(this, false)}
        >
          {this.state.sceneModalView === SCENE_MODAL_VIEWS.MANAGE_SCENE && (
            <DmSceneManager />
          )}
        </ReactModal>
        <div className="dm-board-options">
          <div className="dm-board-option">
            <JxButton icon="Camera" style="square" />
            <div className="dm-board-option-flyout">
              <JxButton
                label="Edit"
                icon="Edit"
                onClick={this.toggleSceneManager.bind(
                  this,
                  true,
                  SCENE_MODAL_VIEWS.MANAGE_SCENE
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
