import * as React from "react";
import { ICampaignSceneLayoutLocationType } from "src/apis/campaignScenes.api";
import { JxButton } from "src/common/button/jx-button";
import { JxButtonGroup } from "src/common/button/jx-button-group";
import { PbLocationView } from "src/playboard/views/pb-location";
import { ScenePreviewManager } from "src/services/sceneManager.service";

export class DmSceneLayoutSelect extends React.Component {
  public setLayoutLocationType(locationType: ICampaignSceneLayoutLocationType) {
    ScenePreviewManager.updateLocationType(locationType);
    // this.setState({});
  }

  public render() {
    return (
      <div className="dm-scene-layout-select">
        <JxButtonGroup>
          <JxButton
            style="tile"
            label="Location Overview"
            onClick={() => this.setLayoutLocationType("overview")}
          />
          <JxButton
            style="tile"
            label="Location Detail"
            onClick={() => this.setLayoutLocationType("detail")}
          />
        </JxButtonGroup>
        <PbLocationView isPreview={true} />
      </div>
    );
  }
}
