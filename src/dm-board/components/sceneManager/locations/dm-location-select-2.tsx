import * as React from "react";
import { CampaignRegions, ICampaignRegion } from "src/apis/campaignRegions.api";
import { ICampaignScene } from "src/apis/campaignScenes.api";
import { CampaignSectors, ICampaignSector } from "src/apis/campaignSectors.api";
import { CampaignSpaces, ICampaignSpace } from "src/apis/campaignSpaces.api";
import { JxButton } from "src/common/button/jx-button";
import { ImageTile } from "src/common/image-tile";
import { ScenePreviewManager } from "src/services/sceneManager.service";
import { DmRegionSelect } from "./dm-region-select";
import { DmSectorSelect } from "./dm-sector-select";
import { DmSpaceSelect } from "./dm-space-select";

import "./location-select.scss";

interface DmLocationSelect2Props {}

interface DmLocationSelect2State {
  page: string;
  region?: ICampaignRegion;
  sector?: ICampaignSector;
  space?: ICampaignSpace;
  selecting: "none" | "region" | "sector" | "space";
}

export class DmLocationSelect2 extends React.Component<
  DmLocationSelect2Props,
  DmLocationSelect2State
> {
  constructor(props: DmLocationSelect2Props) {
    super(props);

    const scene = ScenePreviewManager.scene.current() as ICampaignScene;

    this.state = {
      page: "home",
      region: scene.region as ICampaignRegion,
      sector: scene.sector,
      space: scene.space,
      selecting: "none"
    };

    this.updateRegion = this.updateRegion.bind(this);
    this.updateSector = this.updateSector.bind(this);
    this.updateSpace = this.updateSpace.bind(this);
  }

  public updateRegion(regionKey?: number) {
    const region = regionKey ? CampaignRegions.getRegion(regionKey) : undefined;

    this.setState({
      region,
      sector: undefined,
      space: undefined,
      selecting: "none"
    });

    ScenePreviewManager.updateLocation({
      region: regionKey
    });
  }

  public updateSector(sectorKey?: number) {
    this.setState({
      sector: sectorKey ? CampaignSectors.getSector(sectorKey) : undefined,
      space: undefined,
      selecting: "none"
    });

    ScenePreviewManager.updateLocation({
      region: (this.state.region as ICampaignRegion).key,
      sector: sectorKey
    });
  }

  public updateSpace(spaceKey?: number) {
    this.setState({
      space: spaceKey ? CampaignSpaces.getSpace(spaceKey) : undefined,
      selecting: "none"
    });

    ScenePreviewManager.updateLocation({
        region: (this.state.region as ICampaignRegion).key,
        sector: (this.state.sector as ICampaignSector).key,
        space: spaceKey
      });
  }

  public render() {
    const region = this.state.region as ICampaignRegion;
    const sector = this.state.sector as ICampaignSector;
    const space = this.state.space as ICampaignSpace;

    return (
      <div className="location-select">
        {this.state.selecting === "none" && (
          <div className="location-select-home">
            <div className="location-select-home-section">
              <div className="location-select-title">Region</div>

              <div className="tile-group">
                {region && (
                  <ImageTile
                    label={region.title}
                    imagesrc={region.imagesrc}
                    onSelect={() => this.setState({ selecting: "region" })}
                  />
                )}
                {!region && (
                  <JxButton
                    style="tile"
                    label="Select"
                    icon="Plus"
                    onClick={() => this.setState({ selecting: "region" })}
                  />
                )}
              </div>
            </div>
            <div className="location-select-home-section">
              <div className="location-select-title">Sector</div>

              <div className="tile-group">
                {sector && (
                  <ImageTile
                    label={sector.title}
                    imagesrc={sector.imagesrc}
                    onSelect={() => this.setState({ selecting: "sector" })}
                  />
                )}
                {!sector && (
                  <JxButton
                    style="tile"
                    label="Select"
                    icon="Plus"
                    disabled={!region}
                    onClick={() => this.setState({ selecting: "sector" })}
                  />
                )}
              </div>
            </div>
            <div className="location-select-home-section">
              <div className="location-select-title">Space</div>

              <div className="tile-group">
                {space && (
                  <ImageTile
                    label={space.title}
                    imagesrc={space.imagesrc}
                    onSelect={() => this.setState({ selecting: "space" })}
                  />
                )}
                {!space && (
                  <JxButton
                    style="tile"
                    label="Select"
                    icon="Plus"
                    disabled={!sector}
                    onClick={() => this.setState({ selecting: "space" })}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        {this.state.selecting === "region" && (
          <div className="location-select-home-section">
            <div className="location-select-title">Region</div>

            <DmRegionSelect
              onSelect={this.updateRegion}
              onSelectNone={this.updateRegion}
            />
          </div>
        )}
        {this.state.selecting === "space" && (
          <div className="location-select-home-section">
            <div className="location-select-title">Sector</div>

            <DmSpaceSelect
              sector={sector.key}
              onSelect={this.updateSpace}
              onSelectNone={this.updateSpace}
            />
          </div>
        )}
        {this.state.selecting === "sector" && (
          <div className="location-select-home-section">
            <div className="location-select-title">Space</div>

            <DmSectorSelect
              region={region.key}
              onSelect={this.updateSector}
              onSelectNone={this.updateSector}
            />
          </div>
        )}
      </div>
    );
  }
}
