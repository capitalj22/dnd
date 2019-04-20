import { isFunction } from "lodash";
import * as React from "react";
import { CampaignSectors, ICampaignSector } from "src/apis/campaignSectors.api";
import { TileSelect } from "src/common/tileSelect/tile-select";

interface DmSectorSelectState {
  sectors: ICampaignSector[];
}

interface DmSectorSelectProps {
  region: number;
  onSelect: (sectorKey: number) => any;
  onSelectNone?: () => any;
}

export class DmSectorSelect extends React.Component<
  DmSectorSelectProps,
  DmSectorSelectState,
  any
> {
  constructor(props: any) {
    super(props);

    if (this.props.region) {
      this.state = {
        sectors: CampaignSectors.getSectorsByRegion(this.props.region)
      };
    }

    this.selectSector = this.selectSector.bind(this);
    this.selectNone = this.selectNone.bind(this);
  }

  public selectSector(sectorKey: number) {
    this.props.onSelect(sectorKey);
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
            onSelect={this.selectSector}
            onSelectNone={this.selectNone}
            tiles={this.state.sectors}
            srcProp="imagesrc"
            keyProp="key"
            labelProp="title"
          />
        )}
      </div>
    );
  }
}
