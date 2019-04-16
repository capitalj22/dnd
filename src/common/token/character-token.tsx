import * as React from "react";
import { CampaignImages } from "src/apis/campaignImages.api";
import { CommonImages } from "src/apis/commonImages.api";
import './character-token.scss';

export class CharacterToken extends React.Component<any, any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      characterimg: CampaignImages.getCharacterImages()[0]
    };
  }
  public render() {
    return (
      <div className="character-token"
        style={{ backgroundImage: `url('${this.state.characterimg}')` }}>
        <div
          className="character-token-overlay"
          style={{ backgroundImage: `url('${CommonImages.getImages()[1]}')` }}
        />
      </div>
    );
  }
}
