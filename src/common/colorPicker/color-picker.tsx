import { isFunction } from "lodash";
import * as React from "react";
// @ts-ignore
import { SketchPicker } from "react-color";
import { JxButton } from "../button/jx-button";

interface ColorPickerProps {
  onSelect: (color: any) => any;
  onChange?: (color: any) => any;
  defaultColor?: any;
}

interface ColorPickerState {
  currentColor: any;
}

export class ColorPicker extends React.Component<
  ColorPickerProps,
  ColorPickerState
> {
  private currentColor = {};

  constructor(props: ColorPickerProps) {
    super(props);

  
    this.selectColor = this.selectColor.bind(this);
  }

  public shouldComponentUpdate(nextProps: any, nextState: any) {
    return false;
  }

  public handleChange(color: any) {
    this.currentColor = color;
  
    if (isFunction(this.props.onChange)) {
      this.props.onChange(this.currentColor);
    }
  }

  public selectColor() {
    //   console.log(this.currentColor);
    this.props.onSelect(this.currentColor);
  }

  public render() {
    return (
      <div className="color-picker">
        <SketchPicker onChangeComplete={this.handleChange.bind(this)} color={this.props.defaultColor}/>
        <JxButton icon="Check" viz="mortal" onClick={this.selectColor} />
      </div>
    );
  }
}
