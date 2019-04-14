import * as React from "react";
import { CampaignMessenger } from "../../services/campaignManager.service";
import "./pb-background.scss";

export class PlayBoardBackground extends React.Component {
  public state = {
    backgroundImage: {
      color: "rgba(144, 193, 195, 0.2)",
      src: ""
    }
  };

  constructor(props: any) {
    super(props);
  }

  public componentDidMount(): void {
    CampaignMessenger.getBackgroundImage().subscribe((val: string) => {
      this.setState({
        backgroundImage: { ...this.state.backgroundImage, src: val }
      });
    });
    CampaignMessenger.getBackgroundOverlay().subscribe((val: any) => {
      this.setState({
        backgroundImage: { ...this.state.backgroundImage, color: val }
      });
    });
  }

  public render() {
    return (
      <div
        className="pb-bg"
        style={{ backgroundImage: `url(${this.state.backgroundImage.src} )` }}
      >
        <div
          className="pb-bg-overlay"
          style={{
            background: this.state.backgroundImage.color
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
