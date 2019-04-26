import * as React from "react";

interface JxSelectProps {
  onSelect: (e: any) => any;
  options: any[];
}

export class JxSelect extends React.Component<JxSelectProps> {
  public render() {
    return (
      <select onChange={this.props.onSelect}>
        {this.props.options.map(option => (
          <option>{option}</option>
        ))}
      </select>
    );
  }
}
