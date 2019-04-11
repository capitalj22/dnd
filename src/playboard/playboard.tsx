import * as React from "react";
import { DmBoard } from "src/dm-board/dm-board";
import { PlayBoardBackground } from "./pb-background/pb-background";

export class Playboard extends React.Component {
  public render() {
    return (
      <PlayBoardBackground>
        <div className="Playboard">playboard goes here</div>
        <DmBoard />
      </PlayBoardBackground>
    );
  }
}
