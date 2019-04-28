import { isNil } from "lodash";
import * as React from "react";
import { Observable, Subscription } from "rxjs";
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
import { DmLocationSelect2 } from "../locations/dm-location-select-2";
import { DmSceneLayoutSelect } from "../sceneLayout/dm-scene-layout";
import "./dm-scene-creator.scss";
import { DmSceneCreatorHome } from "./home/scene-creator-home";
import { DmMoodSelect } from "./mood/mood-select";

export type DmSceneManagerPage = "home" | "location" | "mood" | "layout";

interface DmSceneManagerState {
  page: DmSceneManagerPage;
  bg: string;
}

interface DmSceneManagerProps {
  onClose: () => any;
}

export class DmSceneManager extends React.Component<
  DmSceneManagerProps,
  DmSceneManagerState
> {
  public overlay: any;
  private subscription: Subscription;

  constructor(props: DmSceneManagerProps) {
    super(props);

    this.state = {
      page: "home",
      bg: ""
    };

    this.goToHome = this.goToHome.bind(this);
    this.updateSceneLocation = this.updateSceneLocation.bind(this);
    this.updateScene = this.updateScene.bind(this);
    this.updatePreviewMood = this.updatePreviewMood.bind(this);
    this.saveScene = this.saveScene.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  public navigate(page: DmSceneManagerPage) {
    this.setState({
      page
    });
  }

  public componentDidMount() {
    this.subscription = ScenePreviewManager.scene.get().subscribe(scene => {
      this.updateScene(scene);
    });
  }

  public componentWillUnmount() {
    this.subscription.unsubscribe();
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
    this.setState({
      bg: scene.layout.backgroundSrc as string
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
    return (
      <div
        className="dm-scene-creator"
        style={{ backgroundImage: `url(${this.state.bg} )` }}
      >
        <MoodOverlay isPreview={true} />
        <div className="dm-scene-creator-content">
          {this.state.page === "home" && (
            <JxModalPage>
              <DmSceneCreatorHome
                onNavigate={this.navigate}
                onSave={this.saveScene}
              />
              <div className="page-footer">
                <div />
                <div>
                  <JxButton
                    onClick={this.saveScene}
                    label="Set Scene"
                    icon="CheckSquare"
                  />
                </div>
              </div>
            </JxModalPage>
          )}
          {this.state.page === "location" && (
            <JxModalPage>
              <DmLocationSelect2 />
              <div className="page-footer">
                <div />
                <div>
                  <JxButton icon="Plus" label="Back" onClick={this.goToHome} />
                </div>
              </div>
            </JxModalPage>
          )}
          {this.state.page === "mood" && (
            <DmMoodSelect onComplete={this.goToHome} />
          )}
          {this.state.page === "layout" && (
            <JxModalPage>
              <DmSceneLayoutSelect />
              <div className="page-footer">
                <div />
                <div>
                  <JxButton
                    icon="CheckSquare"
                    label="Apply Layout"
                    onClick={this.goToHome}
                  />
                </div>
              </div>
            </JxModalPage>
          )}
        </div>
      </div>
    );
  }
}
