import * as React from "react";
import { CampaignManager } from "../campaignManager.service";
import "./pb-background.scss";

export class PlayBoardBackground extends React.Component {
  private manager: CampaignManager;
  private backgroundImage: {
    src: string;
    overlay: {
      color: string;
    };
  };

  constructor(props: any) {
    super(props);
    this.manager = new CampaignManager();

    this.backgroundImage = {
      overlay: {
        color: "rgba(144, 193, 195, 0.2)"
      },
      src: this.manager.getBackgroundImage()
    };
  }

  public updateBackground() {
    //
  }

  public render() {
    return (
      <div
        className="pb-bg"
        style={{ backgroundImage: `url(${this.backgroundImage.src} )` }}
      >
        <div
          className="pb-bg-overlay"
          style={{
            background: this.backgroundImage.overlay.color
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
