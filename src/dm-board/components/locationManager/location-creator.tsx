import * as React from "react";

export interface DmLocationCreatorProps {}

export interface DmLocationCreatorState {}

export class DmLocationCreator extends React.Component<
  DmLocationCreatorProps,
  DmLocationCreatorState
> {
  // state = { :  }
  public render() {
    return (
      <div>
        <label>Title</label>
        <input type={"text"} />
      </div>
    );
  }
}
