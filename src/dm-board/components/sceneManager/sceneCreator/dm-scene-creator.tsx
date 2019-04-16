import * as React from "react";
import { JxButton } from "src/common/button/jx-button";
import { ILocation, SceneManager } from "src/services/viewManager.service";
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
    this.updateScene = this.updateScene.bind(this);
  }

  public goToLocationSelect() {
    this.setState({
      page: "location"
    });
  }

  public updateScene(location: ILocation) {
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
            <JxButton label="Mood" icon="Sun" viz="mortal" />
          </div>
        )}
        {this.state.page === "location" && (
          <div>
            <DmLocationSelect onSelect={this.updateScene} />
          </div>
        )}
      </div>
    );
  }
}
