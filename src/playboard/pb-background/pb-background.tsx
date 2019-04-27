import * as React from "react";
import { CommonImages } from "src/apis/commonImages.api";
import { SceneManager } from "src/services/sceneManager.service";
import { MoodOverlay } from "../moodOverlay/mood-overlay";
import "./pb-background.scss";

export class PlayBoardBackground extends React.Component {
  public state = {
    backgroundImage: {
      src: ""
    },
    backgroundImageNext: "",
    crossfading: false,
    table: {
      topLeft: CommonImages.getImages()[0]
    }
  };

  constructor(props: any) {
    super(props);
  }

  public updateBackgroundImage(imagesrc: string) {
    this.setState({
      backgroundImageNext: imagesrc,
      crossfading: true
    });

    setTimeout(() => {
      this.setState({
        backgroundImage: {
          ...this.state.backgroundImage,
          src: imagesrc
        },
        crossfading: false
      });
    }, 1000);
  }

  public componentDidMount(): void {
    SceneManager.scene.get().subscribe(scene => {
      this.updateBackgroundImage(scene.layout.backgroundSrc)
    });
  }

  public render() {
    return (
      <div
        className="pb-bg"
        style={{ backgroundImage: `url(${this.state.backgroundImage.src} )` }}
      >
        <div
          className="pb-bg-fadein"
          style={{
            backgroundImage: `url(${this.state.backgroundImageNext} )`,
            opacity: this.state.crossfading ? 1 : 0
          }}
        />
        <MoodOverlay />
        <img className="pb-bg-table" src={this.state.table.topLeft} />
        {this.props.children}
      </div>
    );
  }
}
