import { isFunction } from "lodash";
import * as React from "react";
import { CampaignSpaces, ICampaignSpace } from "src/apis/campaignSpaces.api";
import { TileSelect } from "src/common/tileSelect/tile-select";

interface DmSpaceSelectProps {
  sector: number;
  onSelect: (locationKey: number) => any;
  onSelectNone?: () => any;
}

interface DmSpaceSelectState {
  spaces: ICampaignSpace[];
}

export class DmSpaceSelect extends React.Component<
  DmSpaceSelectProps,
  DmSpaceSelectState,
  any
> {
  constructor(props: any) {
    super(props);

    if (this.props.sector) {
      this.state = {
        spaces: CampaignSpaces.getSpacesBySector(this.props.sector)
      };
    }
    this.selectSpace = this.selectSpace.bind(this);
    this.selectNone = this.selectNone.bind(this);
  }

  public selectSpace(spaceKey: number) {
    this.props.onSelect(spaceKey);
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
            onSelect={this.selectSpace}
            onSelectNone={this.selectNone}
            tiles={this.state.spaces}
            srcProp="imagesrc"
            keyProp="key"
            labelProp="title"
          />
        )}
      </div>
    );
  }
}
