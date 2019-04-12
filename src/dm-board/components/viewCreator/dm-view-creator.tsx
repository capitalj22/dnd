import * as React from "react";
import { CampaignImages } from 'src/apis/campaignImages.api';
import { CampaignLocations } from 'src/apis/campaignLocations.api';
import { CampaignRegions } from 'src/apis/campaignRegions.api';

export class DmViewCreator extends React.Component<any, any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
        images: CampaignImages.getImages(),
        locations: CampaignLocations.getLocations(),
        regions: CampaignRegions.getRegions()
    }
  }

  public render() {
    return (
      <div>
        select view type
      </div>
    );
  }
}
