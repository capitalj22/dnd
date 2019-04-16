import { isNil } from 'lodash';
import * as React from "react";
import { CampaignRegions, ICampaignRegion } from 'src/apis/campaignRegions.api';
import { CommonImages } from "src/apis/commonImages.api";
import { SceneManager } from 'src/services/viewManager.service';
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
    const currentScene = SceneManager.scene.current();

    switch (viewManager.viewType.current()) {
      default:
        if (!isNil(currentScene.region)) {
          const region = CampaignRegions.getRegion(currentScene.region) as ICampaignRegion
          return region.imagesrc
        }
        return ''
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
    SceneManager.scene.get().subscribe((scene) => {
      this.updateBackgroundImage();
    })
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
