import { isNil } from "lodash";
import * as React from "react";
import { ICampaignScene } from "src/apis/campaignScenes.api";
import { ICampaignSector } from "src/apis/campaignSectors.api";
import { ICampaignSpace } from "src/apis/campaignSpaces.api";
import { SceneManager } from "src/services/sceneManager.service";
import "../playboard.scss";

interface PbLocationViewState {
  currentLocation: ICampaignSector | ICampaignSpace;
}

export class PbLocationView extends React.Component<
  any,
  PbLocationViewState,
  any
> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentLocation: SceneManager.scene.current().sector as ICampaignSector
    };
  }

  public getCurrentLocation(scene: ICampaignScene) {
    if (!isNil(scene.space)) {
      this.setState({
        currentLocation: scene.space
      });
    } else if (!isNil(scene.sector)) {
      this.setState({
        currentLocation: scene.sector
      });
    }
  }

  public componentDidMount() {
    this.getCurrentLocation(SceneManager.scene.current());

    SceneManager.scene.get().subscribe(scene => {
      this.getCurrentLocation(scene);
    });
  }

  public render() {
    return (
      <div className="pb-location-view">
        {this.state.currentLocation && (
          <div className="pb-location-view-layout">
            <div className="pb-location-left">
              <div
                className="pb-view-location-img"
                style={{
                  backgroundImage: `url('${
                    this.state.currentLocation.imagesrc
                  }')`
                }}
              />
              <div className="pb-location-title">
                <span className="title">
                  {this.state.currentLocation.title}
                </span>
                <hr />
                <span className="subtitle">
                  {this.state.currentLocation.subtitle}
                </span>
              </div>
            </div>
            <div className="pb-location-description">
              {this.state.currentLocation.description}
            </div>
          </div>
        )}
      </div>
    );
  }
}
