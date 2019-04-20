import { isNil } from "lodash";
import * as React from "react";
import { CommonImages } from "src/apis/commonImages.api";
import { SceneManager } from "src/services/sceneManager.service";
import { viewManager } from "../../services/campaignManager.service";
import "./pb-background.scss";

export class PlayBoardBackground extends React.Component {
  public state = {
    backgroundImage: {
      color: "rgba(144, 193, 195, 0.2)",
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

  public getBackgroundSrc(): string {
    const currentScene = SceneManager.scene.current();

    switch (viewManager.viewType.current()) {
      default:
        if (!isNil(currentScene.region)) {
          const region = currentScene.region;
          return region.imagesrc;
        }
        return "";
    }
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
      if (!isNil(scene.mood)) {
        this.setState({
          backgroundImage: {
            ...this.state.backgroundImage,
            color: scene.mood.backgroundOverlay
          }
        });
      }
      if (!isNil(scene.space) && !isNil(scene.sector)) {
        this.updateBackgroundImage(scene.sector.imagesrc);
      } else if (!isNil(scene.region)) {
        this.updateBackgroundImage(scene.region.imagesrc);
      }
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
        <div
          className="pb-bg-overlay"
          style={{
            background: this.state.backgroundImage.color
          }}
        >
          <img className="pb-bg-table" src={this.state.table.topLeft} />
          {this.props.children}
        </div>
      </div>
    );
  }
}
