import { isNil } from "lodash";
import * as React from "react";
import { Subscription } from "rxjs";
import { ICampaignRegion } from "src/apis/campaignRegions.api";
import {
  ICampaignScene,
  ICampaignSceneLayout,
  ICampaignSceneLayoutLocationType
} from "src/apis/campaignScenes.api";
import { ICampaignSector } from "src/apis/campaignSectors.api";
import { ICampaignSpace } from "src/apis/campaignSpaces.api";
import { JxButton } from "src/common/button/jx-button";
import {
  Scene,
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
  private sceneManager: Scene;
  private subscription: Subscription;
  constructor(props: any) {
    super(props);

    this.state = {
      currentLocation: {} as any,
      locationType: "sector",
      layout: {
        locationType: "detail",
        showDescription: true,
        showSubtitle: true,
        backgroundSrc: ""
      }
    };

    this.toggleDescription = this.toggleDescription.bind(this);
    this.toggleSubtitle = this.toggleSubtitle.bind(this);
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
    this.sceneManager = this.props.isPreview
      ? ScenePreviewManager
      : SceneManager;

    this.getCurrentLocation(this.sceneManager.scene.current());

    this.subscription = this.sceneManager.scene.get().subscribe(scene => {
      this.getCurrentLocation(scene);
      this.updateLayout(scene);
    });
  }

  public componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  public toggleDescription() {
    this.sceneManager.updateLayout({
      ...this.state.layout,
      showDescription: !this.state.layout.showDescription
    });
  }

  public toggleSubtitle() {
    this.sceneManager.updateLayout({
      ...this.state.layout,
      showSubtitle: !this.state.layout.showSubtitle
    });
  }

  public render() {
    const classProps = this.props.isPreview ? "preview" : "";

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
            {(this.state.layout.showDescription || this.props.isPreview) && (
              <div className="pb-location-description">
                {this.props.isPreview && (
                  <PreviewOverlay onClick={this.toggleDescription} />
                )}
                {this.state.layout.showDescription &&
                  this.state.currentLocation.description}
              </div>
            )}
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
                {this.state.layout.showSubtitle && <hr />}
                {(this.props.isPreview || this.state.layout.showSubtitle) && (
                  <span className="subtitle">
                    {this.props.isPreview && (
                      <PreviewOverlay onClick={this.toggleSubtitle} />
                    )}
                    {this.state.layout.showSubtitle &&
                      this.state.currentLocation.subtitle}
                  </span>
                )}
              </div>
            </div>
            {(this.state.layout.showDescription || this.props.isPreview) && (
              <div className="pb-location-description">
                {this.props.isPreview && (
                  <PreviewOverlay onClick={this.toggleDescription} />
                )}
                {this.state.layout.showDescription &&
                  this.state.currentLocation.description}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const PreviewOverlay = (props: any) => {
  return (
    <div className="preview-overlay">
      <JxButton icon="EyeOff" style="square" onClick={props.onClick} />
    </div>
  );
};
