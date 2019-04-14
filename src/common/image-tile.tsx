import _ from 'lodash';
import * as React from "react";
import "./image-tile.scss";

interface IImageTileProps {
  imagesrc: string;
  onSelect?: () => any;
}

interface IImageTileState {
  imagesrc: string;
}

export class ImageTile extends React.Component<
  IImageTileProps,
  IImageTileState,
  any
> {
  constructor(props: any) {
    super(props);
    this.state = {
      imagesrc: this.props.imagesrc
    };
  }

  public render() {
    return (
      <div
        onClick={this.props.onSelect}
        className={`image-tile ${this.props.onSelect ? 'selectable' : ''}`}
        style={{ backgroundImage: `url('${this.state.imagesrc}')` }}
      >
        <div className="image-tile-overlay" />
      </div>
    );
  }
}
