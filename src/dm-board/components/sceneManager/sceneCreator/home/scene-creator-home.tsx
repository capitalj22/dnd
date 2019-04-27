import * as React from "react";
import { JxButton } from "src/common/button/jx-button";
import { JxModalPage } from "src/common/modal/modal";
import { DmSceneManagerPage } from "../dm-scene-creator";

export interface DmSceneCreatorHomeProps {
  onNavigate: (page: DmSceneManagerPage) => any;
  onSave: () => any;
}

export interface DmSceneCreatorHomeState {}

export class DmSceneCreatorHome extends React.Component<
  DmSceneCreatorHomeProps,
  DmSceneCreatorHomeState
> {
  // state = { :  }
  public render() {
    return (
      <div className="tile-group">
        <JxButton
          style="tile"
          label="Location"
          icon="MapPin"
          onClick={() => this.props.onNavigate("location")}
        />
        <JxButton
          style="tile"
          label="Mood"
          icon="Sun"
          onClick={() => this.props.onNavigate("mood")}
        />
        <JxButton
          style="tile"
          label="Layout"
          icon="AlignLeft"
          onClick={() => this.props.onNavigate("layout")}
        />
      </div>
    );
  }
}
