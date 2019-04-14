import * as React from "react";
// @ts-ignore
import { Plus } from "react-feather";
import { ICampaignLocation } from "src/apis/campaignLocations.api";
import { CampaignRegions, ICampaignRegion } from "src/apis/campaignRegions.api";
import { CampaignScenes, ICampaignScene } from "src/apis/campaignScenes.api";
import { ImageTile } from "src/common/image-tile";
interface IDmSceneManagerState {
  scenes: ICampaignScene[];
  regions: ICampaignRegion[];
  locations: ICampaignLocation[];
}

export class DmSceneManager extends React.Component<
  any,
  IDmSceneManagerState,
  any
> {
  constructor(props: any) {
    super(props);

    this.state = {
      scenes: CampaignScenes.getScenes(),
      regions: CampaignRegions.getRegions(),
      locations: {} as any
    };
  }

  public selectRegion(region: ICampaignRegion) {
    console.log("region");
  }

  public render() {
    return (
      <div className="dm-scene-manager">
        <div className="dm-scene-manager-by-region">
          Select scene by region
          <div className="image-tile-group">
            {this.state &&
              this.state.regions.map((region: ICampaignRegion) => (
                <ImageTile
                  imagesrc={region.imagesrc}
                  onSelect={this.selectRegion.bind(this, region)}
                />
              ))}
          </div>
        </div>
        <div className="dm-scene-manager-by-location" />
      </div>
    );
  }
}
