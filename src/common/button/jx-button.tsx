import * as React from "react";
import * as ReactFeather from "react-feather";
import { IconType } from "src/constants/icons.constants";
import "./jx-button.scss";

export const JxButtonStyles = {
  normo: "normo",
  square: "square"
};

const JxButtonViz = {
  mortal: "mortal",
  ghost: "ghost"
};

interface JxButtonProps {
  icon?: IconType;
  label?: string;
  style?: "normo" | "square";
  viz?: "mortal" | "ghost";
  onClick?: () => any;
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
  }
  public componentDidMount() {
    this.setState({
      iconType: this.props.icon && ReactFeather[this.props.icon as any]
    });
  }
  public render() {
    const TagName = this.state.iconType;
    const buttonStyle = this.props.style || JxButtonStyles.normo;
    const buttonViz = this.props.viz || JxButtonViz.ghost;
    const hasLabel =
      this.props.label && this.props.style !== JxButtonStyles.square;
    const hasIcon = this.props.icon;
    const iconProps = {
      size: this.props.style === JxButtonStyles.square ? 24 : 18
    } as any;

    return (
      <div className={`jx-button ${buttonStyle} ${buttonViz}`} onClick={this.props.onClick}>
        {hasLabel && <div className="jx-button-label">{this.props.label}</div>}
        {hasIcon && (
          <div className="jx-button-icon">
            {this.state.iconType && <TagName {...iconProps} />}
          </div>
        )}
      </div>
    );
  }
}
