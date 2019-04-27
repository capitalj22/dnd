import * as React from "react";
// @ts-ignore
import ReactModal from "react-modal";

import { CampaignRegions, ICampaignRegion } from "src/apis/campaignRegions.api";
import { CampaignSectors, ICampaignSector } from "src/apis/campaignSectors.api";
import { JxButton } from "src/common/button/jx-button";
import { JxModal } from "src/common/modal/modal";
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
  modalTitle: string;
}

export class DmBoard extends React.Component<any, IDmBoardState, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      showSceneManager: false,
      sceneModalView: SCENE_MODAL_VIEWS.SELECT_REGION,
      modalTitle: "Scene Manager"
    };

    this.closeSceneManager = this.closeSceneManager.bind(this);
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

  public closeSceneManager() {
    this.toggleSceneManager(false, '');
  }

  public render() {
    return (
      <div className="dm-board">
        <ReactModal
          style={{
            content: {
              padding: 0,
              backgroundColor: "#e4e4e4"
            },
            overlay: {}
          }}
          isOpen={this.state.showSceneManager}
          onRequestClose={this.toggleSceneManager.bind(this, false)}
        >
          <JxModal title={this.state.modalTitle}>
            {this.state.sceneModalView === SCENE_MODAL_VIEWS.MANAGE_SCENE && (
              <DmSceneManager onClose={this.closeSceneManager}/>
            )}
          </JxModal>
        </ReactModal>
        <div className="dm-board-options">
          <div className="dm-board-option">
            <JxButton
              icon="Tv"
              style="square"
              onClick={this.toggleSceneManager.bind(
                this,
                true,
                SCENE_MODAL_VIEWS.MANAGE_SCENE
              )}
            />
          </div>
          <div className="dm-board-option">
            <JxButton icon="User" style="square" />
            <div className="dm-board-option-flyout" />
          </div>
          <div className="dm-board-option">
            <JxButton icon="FilePlus" style="square" />
            <div className="dm-board-option-flyout" />
          </div>
        </div>
      </div>
    );
  }
}
