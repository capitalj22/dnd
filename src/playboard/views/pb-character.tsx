import * as React from "react";

export class PbCharacterView extends React.Component<any, any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        This is the character view
        <div>This is a character image</div>
        <div>this is the character text</div>
      </div>
    );
  }
}
