import * as React from "react";
import * as ReactFeather from "react-feather";
import "./jx-button.scss";

export const JxButtonStyles = {
  normo: "normo",
  square: "square"
};

interface JxButtonProps {
  icon?: string;
  label?: string;
  style?: string;
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
      iconType: this.props.icon && ReactFeather[this.props.icon]
    });
  }
  public render() {
    const TagName = this.state.iconType;
    return (
      <div className="jx-button">
        <div className="jx-button-label">{this.props.label}</div>
        <div className="jx-button-icon">
          {this.state.iconType && <TagName />}
        </div>
      </div>
    );
  }
}
