import { isFunction } from "lodash";
import * as React from "react";
import { CampaignRegions, ICampaignRegion } from "src/apis/campaignRegions.api";
import { TileSelect } from "src/common/tileSelect/tile-select";

interface DmRegionSelectProps {
  onSelect: (regionKey: number) => any;
  onSelectNone?: () => any;
}

interface DmRegionSelectState {
  regions: ICampaignRegion[];
}

export class DmRegionSelect extends React.Component<
  DmRegionSelectProps,
  DmRegionSelectState,
  any
> {
  constructor(props: any) {
    super(props);

    this.state = {
      regions: CampaignRegions.getRegions()
    };

    this.selectRegion = this.selectRegion.bind(this);
    this.selectNone = this.selectNone.bind(this);
  }

  public selectRegion(regionKey: number) {
    this.props.onSelect(regionKey);
  }

  public selectNone() {
    if (isFunction(this.props.onSelectNone)) {
      this.props.onSelectNone();
    }
  }

  public render() {
    return (
      <div>
        {this.state && (
          <TileSelect
            showNone={true}
            onSelect={this.selectRegion}
            onSelectNone={this.selectNone}
            tiles={this.state.regions}
            srcProp="imagesrc"
            keyProp="key"
            labelProp="title"
          />
        )}
      </div>
    );
  }
}
