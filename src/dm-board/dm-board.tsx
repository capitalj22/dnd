import * as React from "react";
// @ts-ignore
import { BookOpen, Plus } from "react-feather";
import ReactModal from "react-modal";

import { CampaignMessenger } from "src/services/campaignManager.service";
import { DmSceneManager } from "./components/sceneManager/dm-scene-manager";
import { DmSceneCreator } from "./components/viewCreator/dm-scene-creator";
import { DmViewManager } from "./components/viewManager/dm-view-manager";
import "./dm-board.scss";
import { JxButton } from "src/common/button/jx-button";

const SCENE_MODAL_VIEWS = {
  MANAGER: "manager",
  CREATOR: "creator"
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
      sceneModalView: SCENE_MODAL_VIEWS.MANAGER,
      backgroundImage: CampaignMessenger.getCurrentBackgroundImage()
    };
  }

  public toggleSceneManager(on: boolean) {
    if (this.state.showSceneManager !== on) {
      this.setState({ showSceneManager: on });
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
        <ReactModal
          isOpen={this.state.showSceneManager}
          onRequestClose={this.toggleSceneManager.bind(this, false)}
        >
          {this.state.sceneModalView === SCENE_MODAL_VIEWS.MANAGER && (
            <DmSceneManager />
          )}
          {this.state.sceneModalView === SCENE_MODAL_VIEWS.CREATOR && (
            <DmSceneCreator />
          )}
          <div>
            <JxButton icon="Book" />
          </div>
        </ReactModal>
        <div onClick={this.toggleSceneManager.bind(this, true)}>
          <BookOpen />
        </div>
      </div>
    );
  }
}
