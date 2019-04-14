import * as React from "react";
import { PB_VIEW_TYPES } from "src/common/campaign.constants";
import { CampaignMessenger } from "src/services/campaignManager.service";

export class DmViewManager extends React.Component<any, any, any> {
  constructor(props: any) {
    super(props);
  }

  public setView(viewType: string) {
    CampaignMessenger.view.setView(viewType);
  }

  public render() {
    return (
      <div>
        <button onClick={this.setView.bind(this, PB_VIEW_TYPES.CHARACTER)}>
          character view
        </button>
        <button onClick={this.setView.bind(this, PB_VIEW_TYPES.LOCATION)}>
          location view
        </button>
      </div>
    );
  }
}
