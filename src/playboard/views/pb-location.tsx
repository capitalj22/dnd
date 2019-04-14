import * as React from "react";
import { ICampaignLocation } from "src/apis/campaignLocations.api";
import { CampaignMessenger } from "../../services/campaignManager.service";
import "../playboard.scss";

interface PbLocationViewState {
  currentLocation: ICampaignLocation;
}

export class PbLocationView extends React.Component<
  any,
  PbLocationViewState,
  any
> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentLocation: CampaignMessenger.location.getCurrentLocation()
    };

    CampaignMessenger.location.getLocation().subscribe(location => {
      this.setState({ currentLocation: location });
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
            >
              This is a location image
            </div>
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
