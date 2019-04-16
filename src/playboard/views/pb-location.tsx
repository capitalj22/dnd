import * as React from "react";
import { CampaignSectors, ICampaignSector } from "src/apis/campaignSectors.api";
import { SceneManager } from "src/services/viewManager.service";
import {
  CampaignMessenger,
  LocationManager
} from "../../services/campaignManager.service";
import "../playboard.scss";

interface PbLocationViewState {
  currentLocation: ICampaignSector;
}

export class PbLocationView extends React.Component<
  any,
  PbLocationViewState,
  any
> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentLocation: CampaignSectors.getSector(SceneManager.scene.current()
        .sector as number) as ICampaignSector
    };

    SceneManager.scene.get().subscribe(scene => {
      this.setState({
        currentLocation: CampaignSectors.getSector(
          scene.sector as number
        ) as ICampaignSector
      });
    });
  }

  public render() {
    return (
      <div className="pb-location-view">
        {this.state.currentLocation && (
          <div className="pb-location-view-layout">
            <div
              className="pb-view-location-img"
              style={{
                backgroundImage: `url('${this.state.currentLocation.imagesrc}')`
              }}
            />
            <div className="pb-location-title">
              <span className="title">{this.state.currentLocation.title}</span>
              <span className="subtitle">
                {this.state.currentLocation.subtitle}
              </span>
            </div>

            <div className="pb-location-description">
              {this.state.currentLocation.description}
            </div>
          </div>
        )}
      </div>
    );
  }
}
