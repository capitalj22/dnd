import * as React from "react";
import { CampaignRegions, ICampaignRegion } from "src/apis/campaignRegions.api";
import { ICampaignScene } from "src/apis/campaignScenes.api";
// @ts-ignore
import { JxButton } from "src/common/button/jx-button";
import { ColorPicker } from "src/common/colorPicker/color-picker";
import {
  ILocation,
  SceneManager,
  ScenePreviewManager
} from "src/services/sceneManager.service";
import { DmLocationSelect } from "../locations/dm-location-select";
import "./dm-scene-creator.scss";

interface DmSceneManagerState {
  page: string;
  bg: string;
  overlay: string;
}

interface DmSceneManagerProps {
  onClose: () => any;
}

export class DmSceneManager extends React.Component<DmSceneManagerProps, DmSceneManagerState> {
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
    this.updateMood = this.updateMood.bind(this);
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
    const regionImage = scene && scene.region && scene.region.imagesrc;
    const overlay = scene && scene.mood && scene.mood.backgroundOverlay;

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

  public updateMood(color: any) {
    const mood = {
      backgroundOverlay: `rgba(${color.rgb.r}, ${color.rgb.g}, ${
        color.rgb.b
      }, ${color.rgb.a})`
    };
    ScenePreviewManager.updateMood(mood);
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
    SceneManager.updateScene(ScenePreviewManager.scene.current())

    this.props.onClose();
  }

  public render() {
    return (
      <div
        className="dm-scene-creator"
        style={{ backgroundImage: `url(${this.state.bg} )` }}
      >
        <div
          className="dm-scene-creator-overlay"
          style={{ backgroundColor: this.state.overlay }}
        />
        <div className="dm-scene-creator-content">
          {this.state.page === "home" && (
            <div className="full">
              <div className="tile-group">
                <JxButton
                  style="tile"
                  label="Location"
                  icon="MapPin"
                  viz="mortal"
                  onClick={this.goToLocationSelect}
                />
                <JxButton
                  style="tile"
                  label="Mood"
                  icon="Sun"
                  viz="mortal"
                  onClick={this.goToMoodSelect}
                />
                <JxButton
                  style="tile"
                  label="Type"
                  icon="Type"
                  viz="mortal"
                  onClick={this.goToMoodSelect}
                />
              </div>
              <JxButton
                onClick={this.saveScene}
                label="Apply"
                icon="CheckSquare"
              />
            </div>
          )}
          {this.state.page === "location" && (
            <div>
              <DmLocationSelect onSelect={this.updateSceneLocation} />
            </div>
          )}
          {this.state.page === "mood" && (
            <div>
              <ColorPicker
                defaultColor={this.state.overlay}
                onSelect={this.goToHome}
                onChange={this.updateMood}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
