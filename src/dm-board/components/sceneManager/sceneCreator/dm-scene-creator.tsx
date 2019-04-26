import { isNil } from "lodash";
import * as React from "react";
import { CampaignRegions, ICampaignRegion } from "src/apis/campaignRegions.api";
import { ICampaignScene } from "src/apis/campaignScenes.api";
// @ts-ignore
import { JxButton } from "src/common/button/jx-button";
import { JxModalPage } from "src/common/modal/modal";
import { MoodOverlay } from "src/playboard/moodOverlay/mood-overlay";
import {
  ILocation,
  SceneManager,
  ScenePreviewManager
} from "src/services/sceneManager.service";
import { DmLocationSelect } from "../locations/dm-location-select";
import "./dm-scene-creator.scss";
import { DmMoodSelect } from "./mood/mood-select";

interface DmSceneManagerState {
  page: string;
  bg: string;
  overlay: string;
}

interface DmSceneManagerProps {
  onClose: () => any;
}

export class DmSceneManager extends React.Component<
  DmSceneManagerProps,
  DmSceneManagerState
> {
  public overlay: any;

  constructor(props: DmSceneManagerProps) {
    super(props);

    this.state = {
      page: "home",
      bg: "",
      overlay: ""
    };

    this.goToLocationSelect = this.goToLocationSelect.bind(this);
    this.goToMoodSelect = this.goToMoodSelect.bind(this);
    this.goToHome = this.goToHome.bind(this);
    this.updateSceneLocation = this.updateSceneLocation.bind(this);
    this.updateScene = this.updateScene.bind(this);
    this.updatePreviewMood = this.updatePreviewMood.bind(this);
    this.saveScene = this.saveScene.bind(this);
  }

  public componentDidMount() {
    ScenePreviewManager.scene.get().subscribe(scene => {
      this.updateScene(scene);
    });
  }

  public updatePreviewMood(color: any) {
    const mood = {
      backgroundOverlay: `rgba(${color.rgb.r}, ${color.rgb.g}, ${
        color.rgb.b
      }, ${color.rgb.a})`
    };

    this.overlay = mood.backgroundOverlay;
    this.setState({
      bg: ""
    });
  }

  public updateScene(scene: ICampaignScene) {
    let regionImage = scene && scene.region && scene.region.imagesrc;
    const overlay = scene && scene.mood && scene.mood.backgroundOverlay;

    if (!isNil(scene.space) && !isNil(scene.sector)) {
      regionImage = scene.sector.imagesrc;
    } else if (!isNil(scene.region)) {
      regionImage = scene.region.imagesrc;
    } else {
      // use generic background image ??
    }

    this.setState({
      bg: regionImage as string,
      overlay: overlay as string
    });
  }

  public getBg(): string {
    const scene = SceneManager.scene.current();

    if (scene && scene.region) {
      const region = CampaignRegions.getRegion(
        scene.region.key
      ) as ICampaignRegion;

      return region.imagesrc;
    }

    return "";
  }

  public goToLocationSelect() {
    this.setState({
      page: "location"
    });
  }

  public goToMoodSelect() {
    this.setState({
      page: "mood"
    });
  }

  public goToHome() {
    this.setState({
      page: "home"
    });
  }

  public updateSceneLocation(location: ILocation) {
    this.setState({
      page: "home"
    });
    ScenePreviewManager.updateLocation(location);
  }

  public saveScene() {
    SceneManager.updateScene(ScenePreviewManager.scene.current());

    this.props.onClose();
  }

  public setWeather(weather: string) {
    ScenePreviewManager.updateWeather(weather);
  }

  public render() {
    const data = [
      "normal",
      "multiply",
      "screen",
      "overlay",
      "darken",
      "lighten",
      "color-dodge",
      "color-burn",
      "hard-light",
      "soft-light",
      "difference",
      "exclusion",
      "hue",
      "saturation",
      "color",
      "luminosity"
    ];

    return (
      <div
        className="dm-scene-creator"
        style={{ backgroundImage: `url(${this.state.bg} )` }}
      >
        <MoodOverlay isPreview={true} />
        <div className="dm-scene-creator-content">
          {this.state.page === "home" && (
            <JxModalPage>
              <div className="tile-group">
                <JxButton
                  style="tile"
                  label="Location"
                  icon="MapPin"
                  onClick={this.goToLocationSelect}
                />
                <JxButton
                  style="tile"
                  label="Mood"
                  icon="Sun"
                  onClick={this.goToMoodSelect}
                />
                <JxButton
                  style="tile"
                  label="Type"
                  icon="Type"
                  onClick={this.goToMoodSelect}
                />
              </div>
              <div className="page-footer">
                <JxButton
                  onClick={this.saveScene}
                  label="Set Scene"
                  icon="CheckSquare"
                />
              </div>
            </JxModalPage>
          )}
          {this.state.page === "location" && (
            <DmLocationSelect onSelect={this.updateSceneLocation} />
          )}
          {this.state.page === "mood" && (
            <DmMoodSelect onComplete={this.goToHome} />
          )}
        </div>
      </div>
    );
  }
}
