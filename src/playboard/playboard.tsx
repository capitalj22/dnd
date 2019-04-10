import * as React from "react";
import { PlayBoardBackground } from './pb-background/pb-background';

export class Playboard extends React.Component {
    
    public render() {
      return (
          <PlayBoardBackground>
            <div className="Playboard">
                playboard goes here
            </div>
          </PlayBoardBackground>
      );
    }
  }