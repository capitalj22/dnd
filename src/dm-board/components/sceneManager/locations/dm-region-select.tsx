import * as React from "react";
import { CampaignRegions, ICampaignRegion } from "src/apis/campaignRegions.api";
import { ImageTile } from "src/common/image-tile";

interface DmRegionSelectProps {
  onSelect: (regionKey: number) => any;
}

interface DmRegionSelectState {
  regions: ICampaignRegion[];
  selectingRegion: boolean;
}

export class DmRegionSelect extends React.Component<
  DmRegionSelectProps,
  DmRegionSelectState,
  any
> {
  constructor(props: any) {
    super(props);

    this.state = {
      regions: CampaignRegions.getRegions(),
      selectingRegion: true
    };
  }

  public selectRegion(regionKey: number) {
    this.props.onSelect(regionKey);
  }

  public render() {
    return (
      <div className="dm-region-select">
        <div className="dm-region-select-by-region">
          <div className="image-tile-group">
            {this.state &&
              this.state.regions.map((region: ICampaignRegion) => (
                <ImageTile
                  imagesrc={region.imagesrc}
                  onSelect={this.selectRegion.bind(this, region.key)}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}
