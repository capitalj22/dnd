import * as React from "react";
import { CommonImages } from "src/apis/commonImages.api";
import {
  CampaignMessenger,
  LocationManager,
  viewManager
} from "../../services/campaignManager.service";
import "./pb-background.scss";

export class PlayBoardBackground extends React.Component {
  public state = {
    backgroundImage: {
      color: "rgba(144, 193, 195, 0.2)",
      src: ""
    },
    table: {
      topLeft: CommonImages.getImages()[0]
    }
  };

  constructor(props: any) {
    super(props);
  }

  public getBackgroundSrc(): string {
    switch (viewManager.viewType.current()) {
      default:
        return LocationManager.region.current().imagesrc;
    }
  }

  public updateBackgroundImage() {
    this.setState({
      backgroundImage: {
        ...this.state.backgroundImage,
        src: this.getBackgroundSrc()
      }
    });
  }

  public componentDidMount(): void {
    viewManager.viewType.get().subscribe(val => {
      this.updateBackgroundImage();
    });

    LocationManager.region.get().subscribe(() => {
      this.updateBackgroundImage();
    });

    LocationManager.location.get().subscribe(() => {
      this.updateBackgroundImage();
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
         <img
          className="pb-bg-table"
          src={this.state.table.topLeft}
        />
          {this.props.children}
        </div>
      </div>
    );
  }
}
