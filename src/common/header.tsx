import * as React from "react";
import { Link } from "react-router-dom";

export default class AppHeader extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Link to="/">Home</Link>
      </div>
    );
  }
}
