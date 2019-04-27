import { join } from "lodash";
import * as React from "react";
import * as ReactFeather from "react-feather";
import { IconType } from "src/constants/icons.constants";
import "./jx-button.scss";

export const JxButtonStyles = {
  normo: "normo",
  square: "square",
  tile: "tile"
};

const JxButtonViz = {
  mortal: "mortal",
  ghost: "ghost"
};

interface JxButtonProps {
  icon?: IconType;
  iconOnLeft?: boolean;
  label?: string;
  style?: "normo" | "square" | "tile";
  viz?: "mortal" | "ghost";
  onClick?: () => any;
  disabled?: boolean;
}

interface JxButtonState {
  iconType: string;
}

export class JxButton extends React.Component<JxButtonProps, JxButtonState> {
  constructor(props: JxButtonProps) {
    super(props);
    this.state = {
      iconType: ""
    };

    this.handleClick = this.handleClick.bind(this);
  }

  public componentDidMount() {
    this.setState({
      iconType: this.props.icon && ReactFeather[this.props.icon as any]
    });
  }

  public getIconSize(): number {
    switch (this.props.style) {
      case JxButtonStyles.square:
        return 24;
      case JxButtonStyles.tile:
        return 36;
      case JxButtonStyles.normo:
      default:
        return 18;
    }
  }

  public handleClick(): void {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick();
    }
  }

  public render() {
    const buttonClasses = [
      this.props.disabled ? "disabled" : "enabled",
      this.props.viz || JxButtonViz.ghost,
      this.props.style || JxButtonStyles.normo
    ];

    const TagName = this.state.iconType;

    const hasLabel =
      this.props.label && this.props.style !== JxButtonStyles.square;
    const hasIcon = this.props.icon;
    const iconProps = {
      size: this.getIconSize()
    } as any;

    const icon = (
      <div className="jx-button-icon">
        {this.state.iconType && <TagName {...iconProps} />}
      </div>
    );

    return (
      <div
        className={`jx-button ${join(buttonClasses, " ")}`}
        onClick={this.handleClick}
      >
        {hasIcon && this.props.iconOnLeft && icon}
        {hasLabel && (
          <div
            className={`jx-button-label ${
              this.props.iconOnLeft ? "icon-on-left" : ""
            }`}
          >
            {this.props.label}
          </div>
        )}
        {hasIcon && !this.props.iconOnLeft && icon}
      </div>
    );
  }
}
