import * as React from "react";
// @ts-ignore
import { Map } from "react-feather";
import "./dm-board-tray.scss";
interface IDmBoardState {
  isOpen: boolean;
}
export class DmBoardTray extends React.Component<any, IDmBoardState, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  public toggleContent() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  public render() {
    return (
      <div className="dm-board-tray">
        <div
          className="content"
          style={this.state.isOpen ? { width: "6rem" } : { width: 0 }}
        >
          {this.state.isOpen && this.props.children}
        </div>
        <div className="handle" onClick={this.toggleContent.bind(this)}>
          <Map className="icon" />
        </div>
      </div>
    );
  }
}
