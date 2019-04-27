import { isNil } from "lodash";
import * as React from "react";
import { ICampaignRegion } from "src/apis/campaignRegions.api";
import {
  ICampaignScene,
  ICampaignSceneLayout,
  ICampaignSceneLayoutLocationType
} from "src/apis/campaignScenes.api";
import { ICampaignSector } from "src/apis/campaignSectors.api";
import { ICampaignSpace } from "src/apis/campaignSpaces.api";
import {
  SceneManager,
  ScenePreviewManager
} from "src/services/sceneManager.service";
import "../playboard.scss";

interface PbLocationViewState {
  currentLocation: ICampaignSector | ICampaignSpace | ICampaignRegion;
  locationType: "region" | "sector" | "space";
  layout: ICampaignSceneLayout;
}

interface PbLocationViewProps {
  isPreview?: boolean;
}

export class PbLocationView extends React.Component<
  PbLocationViewProps,
  PbLocationViewState,
  any
> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentLocation: {} as any,
      locationType: "sector",
      layout: {
        locationType: "detail",
        showDescription: true,
        backgroundSrc: ""
      }
    };
  }

  public getCurrentLocation(scene: ICampaignScene) {
    if (!isNil(scene.space)) {
      this.setState({
        currentLocation: scene.space,
        locationType: "space"
      });
    } else if (!isNil(scene.sector)) {
      this.setState({
        currentLocation: scene.sector,
        locationType: "sector"
      });
    } else if (!isNil(scene.region)) {
      this.setState({
        currentLocation: scene.region,
        locationType: "region"
      });
    }
  }

  public updateLayout(scene: ICampaignScene) {
    this.setState({
      layout: scene.layout
    });
  }

  public componentDidMount() {
    const sceneManager = this.props.isPreview
      ? ScenePreviewManager
      : SceneManager;

    this.getCurrentLocation(sceneManager.scene.current());

    sceneManager.scene.get().subscribe(scene => {
      this.getCurrentLocation(scene);
      this.updateLayout(scene);
    });
  }

  public render() {
    const classProps = this.props.isPreview ? 'preview' : '';

    return (
      <div className={`pb-location-view ${classProps}`}>
        {this.state.layout.locationType === "overview" && (
          <div className="pb-location-view-layout-overview">
            <div className="pb-location-title">
              <span className="title">{this.state.currentLocation.title}</span>
              <hr />
              <span className="subtitle">
                {this.state.currentLocation.subtitle}
              </span>
            </div>
          </div>
        )}
        {this.state.layout.locationType === "detail" && (
          <div className="pb-location-view-layout-detail">
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
            {this.state.layout.showDescription && (
              <div className="pb-location-description">
                {this.state.currentLocation.description}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
