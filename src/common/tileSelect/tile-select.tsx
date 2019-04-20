import { isFunction } from "lodash";
import * as React from "react";
import { JxButton } from "src/common/button/jx-button";
import { ImageTile } from "src/common/image-tile";

interface TileSelectProps {
  showNone?: boolean;
  tiles: any[];
  srcProp: string;
  keyProp: string;
  labelProp?: string;
  onSelect: (key: number) => any;
  onSelectNone?: () => any;
}

export class TileSelect extends React.Component<TileSelectProps, any> {
  constructor(props: any) {
    super(props);

    this.selectNone = this.selectNone.bind(this);
  }

  public selectTile(key: number) {
    this.props.onSelect(key);
  }

  public selectNone() {
    if (isFunction(this.props.onSelectNone)) {
      this.props.onSelectNone();
    }
  }

  public render() {
    return (
      <div className="dm-region-select">
        <div className="image-tile-group">
          {this.props &&
            this.props.tiles.map(tile => (
              <ImageTile
                label={this.props.labelProp ? tile[this.props.labelProp] : null}
                imagesrc={tile[this.props.srcProp]}
                onSelect={this.selectTile.bind(this, tile[this.props.keyProp])}
              />
            ))}
          {this.props.showNone && (
            <JxButton
              icon="X"
              label="none"
              viz="mortal"
              style="tile"
              onClick={this.selectNone}
            />
          )}
        </div>
      </div>
    );
  }
}
