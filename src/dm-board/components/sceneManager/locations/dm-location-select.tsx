import * as React from "react";
import {
  CampaignLocations,
  ICampaignLocation
} from "src/apis/campaignLocations.api";
import { JxButton } from "src/common/button/jx-button";
import { ImageTile } from "src/common/image-tile";
import { LocationManager } from "src/services/campaignManager.service";
import { DmRegionSelect } from "./dm-region-select";

interface DmLocationSelectState {
  locations: ICampaignLocation[];
  selectingRegion: boolean;
}

interface DmLocationSelectProps {
  onSelect: (locationKey: number) => any;
}

export class DmLocationSelect extends React.Component<
  DmLocationSelectProps,
  DmLocationSelectState,
  any
> {
  constructor(props: any) {
    super(props);

    this.state = {
      locations: CampaignLocations.getLocationsByRegion(
        LocationManager.location.current().region
      ),
      selectingRegion: false
    };
  }

  public selectLocation(locationKey: number) {
    this.props.onSelect(locationKey)
  }

  public goToRegionSelect() {
    this.setState({
      selectingRegion: true
    });
  }

  public selectRegion(regionKey: number) {
    this.setState({
      locations: CampaignLocations.getLocationsByRegion(regionKey),
      selectingRegion: false
    });
  }

  public render() {
    return (
      <div className="dm-location-select">
        {this.state.selectingRegion && (
          <DmRegionSelect onSelect={this.selectRegion.bind(this)} />
        )}
        {!this.state.selectingRegion && (
          <div className="dm-location-select-by-region">
            <JxButton
              label="Select Region"
              icon="ArrowLeft"
              viz="mortal"
              onClick={this.goToRegionSelect.bind(this)}
            />
            <div className="image-tile-group">
              {this.state &&
                this.state.locations.map((location: ICampaignLocation) => (
                  <ImageTile
                    imagesrc={location.imagesrc}
                    onSelect={this.selectLocation.bind(this, location)}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
