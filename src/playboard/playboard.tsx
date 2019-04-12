import * as React from "react";
import { DmBoard } from "src/dm-board/dm-board";
import { DmBoardTray } from "src/dm-board/dm-board-tray";
import { CampaignMessenger } from "./campaignManager.service";
import { PlayBoardBackground } from "./pb-background/pb-background";
import { PbCharacterView } from './views/pb-character';
import { PbLocationView } from "./views/pb-location";

const views = {
  LOCATION: "location",
  CHARACTER: "character"
};

interface IPlayboardState {
  currentView: string;
}

export class Playboard extends React.Component<any, IPlayboardState, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentView: views.LOCATION
    };

    CampaignMessenger.view.getView().subscribe(view => {
      this.setState({ currentView: view });
    });
  }

  public render() {
    return (
      <PlayBoardBackground>
        <DmBoardTray>
          <DmBoard />
        </DmBoardTray>
        <div className="pb-view-container" />
        {this.state.currentView === views.LOCATION && <PbLocationView />}
        {this.state.currentView === views.CHARACTER && <PbCharacterView />}
      </PlayBoardBackground>
    );
  }
}
