import * as React from "react";
// @ts-ignore
import { SketchPicker } from "react-color";
import { JxButton } from "src/common/button/jx-button";
import { ColorPicker } from "src/common/colorPicker/color-picker";
import { ILocation, SceneManager } from "src/services/sceneManager.service";
import { DmLocationSelect } from "../locations/dm-location-select";

interface DmSceneManagerState {
  page: string;
}

export class DmSceneManager extends React.Component<any, DmSceneManagerState> {
  constructor(props: any) {
    super(props);

    this.state = {
      page: "home"
    };

    this.goToLocationSelect = this.goToLocationSelect.bind(this);
    this.goToMoodSelect = this.goToMoodSelect.bind(this);
    this.goToHome = this.goToHome.bind(this);
    this.updateSceneLocation = this.updateSceneLocation.bind(this);
    this.updateMood = this.updateMood.bind(this);
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
    SceneManager.updateMood(mood);
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
    SceneManager.updateLocation(location);
  }

  public render() {
    return (
      <div className="jx-button-group">
        {this.state.page === "home" && (
          <div>
            <JxButton
              label="Location"
              icon="MapPin"
              viz="mortal"
              onClick={this.goToLocationSelect}
            />
            <JxButton
              label="Mood"
              icon="Sun"
              viz="mortal"
              onClick={this.goToMoodSelect}
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
            <ColorPicker onSelect={this.goToHome} onChange={this.updateMood} />
          </div>
        )}
      </div>
    );
  }
}
