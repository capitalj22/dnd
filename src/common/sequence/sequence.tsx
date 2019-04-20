import { isFunction } from "lodash";
import * as React from "react";
import "./sequence.scss";

interface SequenceItemProps {
  label: string;
  onClick?: () => any;
  enabled?: boolean;
  active?: boolean;
  number?: number;
}

export class JxSequenceItem extends React.Component<SequenceItemProps> {
  constructor(props: SequenceItemProps) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  public handleClick() {
    if (isFunction(this.props.onClick) && this.props.enabled) {
      this.props.onClick();
    }
  }

  public render() {
    return (
      <div
        className={`sequence-item 
        ${this.props.enabled ? "enabled" : "disabled"}
        ${this.props.active ? "active" : "inactive"}`}
        onClick={this.handleClick}
      >
        <div className="sequence-number">{this.props.number}</div>
        <div className="sequence-label">{this.props.label}</div>
      </div>
    );
  }
}

export const JxSequence = (props: any) => {
  return <div className="sequence">{props.children}</div>;
};
