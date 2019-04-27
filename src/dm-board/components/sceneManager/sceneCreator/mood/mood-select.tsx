import * as React from "react";
import { ICampaignScene } from "src/apis/campaignScenes.api";
import { JxButton } from "src/common/button/jx-button";
import { JxButtonGroup } from "src/common/button/jx-button-group";
import { ColorPicker } from "src/common/colorPicker/color-picker";
import { JxModalPage } from "src/common/modal/modal";
import { JxSelect } from "src/common/select/jx-select";
import {
  SceneManager,
  ScenePreviewManager
} from "src/services/sceneManager.service";

interface DmMoodSelectProps {
  onComplete: () => any;
}

interface DmMoodSelectSate {
  isColorPickerOpen: boolean;
}

export class DmMoodSelect extends React.Component<
  DmMoodSelectProps,
  DmMoodSelectSate
> {
  private initialScene: ICampaignScene = ScenePreviewManager.scene.current();

  constructor(props: DmMoodSelectProps) {
    super(props);

    this.state = {
      isColorPickerOpen: false
    };

    this.setWeather = this.setWeather.bind(this);
    this.updateMood = this.updateMood.bind(this);
    this.resetMood = this.resetMood.bind(this);
    this.cancel = this.cancel.bind(this);
    this.openColorPicker = this.openColorPicker.bind(this);
    this.closeColorPicker = this.closeColorPicker.bind(this);
    this.onSelectOverlay = this.onSelectOverlay.bind(this);
  }

  public resetMood() {
    ScenePreviewManager.updateMood(this.initialScene.mood);
    ScenePreviewManager.updateWeather(this.initialScene.weather);
  }

  public cancel() {
    this.resetMood();
    this.props.onComplete();
  }

  public updateMood(color: any) {
    const backgroundOverlay = `rgba(${color.rgb.r}, ${color.rgb.g}, ${
      color.rgb.b
    }, ${color.rgb.a})`;

    ScenePreviewManager.updateMood({
      ...ScenePreviewManager.scene.current().mood,
      backgroundOverlay
    });
  }

  public openColorPicker() {
    this.setState({
      isColorPickerOpen: true
    });
  }

  public closeColorPicker() {
    this.setState({
      isColorPickerOpen: false
    });
  }

  public onSelectOverlay(e: any) {
    ScenePreviewManager.updateMood({
      ...ScenePreviewManager.scene.current().mood,
      overlayType: e.currentTarget.value
    });

    console.log(ScenePreviewManager.scene.current().mood);
  }

  public setWeather(weather: string) {
    ScenePreviewManager.updateWeather(weather);
  }

  public render() {
    const options = [
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

    const scene = SceneManager.scene.current();
    const isColorPickerOpen = this.state.isColorPickerOpen;
    return (
      <JxModalPage>
        <div className="dm-scene-creator-page-split">
          <div className="dm-scene-creator-page-section">
            <div>Overlay</div>
            <JxButton
              onClick={this.openColorPicker}
              icon="Droplet"
              label="Overlay"
            />
            {isColorPickerOpen && (
              <ColorPicker
                defaultColor={
                  scene && scene.mood && scene.mood.backgroundOverlay
                }
                onChange={this.updateMood}
                onSelect={this.closeColorPicker}
              />
            )}
            <JxSelect options={options} onSelect={this.onSelectOverlay} />
          </div>
          <div className="dm-scene-creator-page-section">
            <div className="effects">
              <JxButtonGroup>
                <JxButton
                  icon="Sun"
                  style="square"
                  onClick={this.setWeather.bind(this, "sun")}
                />
                <JxButton
                  icon="CloudDrizzle"
                  style="square"
                  onClick={this.setWeather.bind(this, "drizzle")}
                />
                <JxButton
                  icon="CloudRain"
                  style="square"
                  onClick={this.setWeather.bind(this, "rain")}
                />
                <JxButton
                  icon="CloudLightning"
                  style="square"
                  onClick={this.setWeather.bind(this, "storm")}
                />
                <JxButton
                  icon="CloudSnow"
                  style="square"
                  onClick={this.setWeather.bind(this, "snow")}
                />
              </JxButtonGroup>
              <JxButtonGroup>
                <JxButton
                  icon="AlertCircle"
                  style="normo"
                  label="Fire"
                  onClick={this.setWeather.bind(this, "fire")}
                />
                <JxButton
                  icon="Coffee"
                  style="normo"
                  label="Coffee"
                  onClick={this.setWeather.bind(this, "fire")}
                />
              </JxButtonGroup>
            </div>
          </div>
        </div>
        <div className="page-footer">
          <div className="left">
            <JxButton label="Reset" onClick={this.resetMood} icon="RotateCcw" />
          </div>
          <div className="right">
            <JxButton label="Cancel" onClick={this.cancel} icon="X" />
            <JxButton
              onClick={this.props.onComplete}
              label="Apply Mood"
              icon="CheckSquare"
            />
          </div>
        </div>
      </JxModalPage>
    );
  }
}
