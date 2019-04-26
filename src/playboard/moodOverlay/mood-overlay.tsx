import * as React from "react";
import { ICampaignScene } from "src/apis/campaignScenes.api";
import { CommonImages } from "src/apis/commonImages.api";
import {
  SceneManager,
  ScenePreviewManager
} from "src/services/sceneManager.service";
import "./mood-overlay.scss";

export type blendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity";

interface IMoodOverlayProps {
  isPreview?: boolean;
}

interface IMoodOverlayState {
  weather: string;
  overlay: string;
  overlayType: blendMode;
}

export class MoodOverlay extends React.Component<
  IMoodOverlayProps,
  IMoodOverlayState
> {
  constructor(props: IMoodOverlayProps) {
    super(props);

    this.state = {
      weather: "sun",
      overlay: "",
      overlayType: "color"
    };
  }

  public componentDidMount() {
    if (this.props.isPreview) {
      ScenePreviewManager.scene.get().subscribe(scene => {
        this.updateMood(scene);
      });
    } else {
      SceneManager.scene.get().subscribe(scene => {
        this.updateMood(scene);
      });
    }
  }

  public updateMood(scene: ICampaignScene) {
    if (scene) {
      this.setState({
        weather: scene.weather
      });

      if (scene.mood) {
        this.setState({
          overlay: scene.mood.backgroundOverlay,
          overlayType: scene.mood.overlayType
        });
      }
    }
  }

  public setWeatherStyle(): React.CSSProperties[] {
    switch (this.state.weather) {
      case "snow":
        return [
          {
            backgroundImage: `url('${CommonImages.images.snow}')`,
            mixBlendMode: "screen"
          }
        ];
      case "rain":
        return [
          {
            backgroundImage: `url('${CommonImages.images.rain}')`,
            mixBlendMode: "screen",
            opacity: 0.8
          }
        ];
      case "drizzle":
        return [
          {
            backgroundImage: `url('${CommonImages.images.drizzle}')`,
            mixBlendMode: "screen",
            opacity: 0.6
          }
        ];
      case "fire":
        return [
          {
            backgroundImage: `url('${CommonImages.images.smoke2}')`,
            mixBlendMode: "multiply",
            backgroundSize: "cover",
            opacity: 0.4
          },
          {
            backgroundImage: `url('${CommonImages.images.particle1}')`,
            mixBlendMode: "color-dodge"
          },
          {
            backgroundImage: `url('${CommonImages.images.particle3}')`,
            mixBlendMode: "lighten",
            backgroundSize: "cover"
          }
        ];
      case "sunny":
      default:
        return [{}];
    }
  }

  public render() {
    const weatherStyles = this.setWeatherStyle() || [];
    const overlayStyle = {
      backgroundColor: this.state.overlay,
      mixBlendMode: this.state.overlayType
    };

    return (
      <div className="mood-overlay">
        {weatherStyles.map(style => (
          <div className="weather-overlay" style={style} />
        ))}
        <div className="color-overlay" style={overlayStyle} />
      </div>
    );
  }
}
