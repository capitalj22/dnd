import { isNil } from "lodash";
import * as React from "react";
import { JxButton } from "src/common/button/jx-button";
import { SceneManager } from "src/services/viewManager.service";
import { DmRegionSelect } from "./dm-region-select";
import { DmSectorSelect } from "./dm-sector-select";
import { DmSpaceSelect } from "./dm-space-select";

interface DmLocationSelectProps {
  onSelect: (location: {
    region?: number | null;
    sector?: number | null;
    space?: number | null;
  }) => any;
}

interface DmLocationSelectState {
  selectionMode: "region" | "sector" | "space";
  selectedRegion?: number | null;
  selectedSector?: number | null;
  selectedSpace?: number | null;
}

export class DmLocationSelect extends React.Component<
  DmLocationSelectProps,
  DmLocationSelectState
> {
  constructor(props: any) {
    super(props);
    const currentScene = SceneManager.scene.current();
    this.state = {
      selectedRegion: currentScene.region,
      selectedSector: currentScene.sector,
      selectedSpace: currentScene.space,
      selectionMode: "region"
    };

    this.selectRegion = this.selectRegion.bind(this);
    this.selectSector = this.selectSector.bind(this);
    this.selectSpace = this.selectSpace.bind(this);
    this.goToRegionSelect = this.goToRegionSelect.bind(this);
    this.goToSectorSelect = this.goToSectorSelect.bind(this);
  }

  public componentDidMount() {
    if (this.state.selectedSpace || this.state.selectedSector) {
      this.setState({
        selectionMode: "space"
      });
    } else if (this.state.selectedRegion) {
      this.setState({
        selectionMode: "sector"
      });
    } else {
      this.setState({
        selectionMode: "region"
      });
    }
  }

  public selectLocation() {
    this.props.onSelect({
      region: this.state.selectedRegion,
      sector: this.state.selectedSector,
      space: this.state.selectedSpace
    });
  }

  public goToRegionSelect() {
    this.setState({
      selectionMode: "region"
    });
  }

  public goToSectorSelect() {
    this.setState({
      selectionMode: "sector"
    });
  }

  public selectRegion(regionKey?: number) {
    if (!isNil(regionKey)) {
      this.setState({
        selectedRegion: regionKey,
        selectedSector: null,
        selectedSpace: null,
        selectionMode: "sector"
      });
    } else {
      this.setState({
        selectedRegion: null,
        selectedSector: null,
        selectedSpace: null
      });

      this.selectLocation();
    }
  }

  public selectSector(sectorKey?: number) {
    if (!isNil(sectorKey)) {
      this.setState({
        selectedSector: sectorKey,
        selectedSpace: null,
        selectionMode: "space"
      });
    } else {
      this.setState({
        selectedSector: null,
        selectedSpace: null
      });

      this.selectLocation();
    }
  }

  public selectSpace(spaceKey?: number) {
    if (!isNil(spaceKey)) {
      this.setState({
        selectedSpace: spaceKey,
        selectionMode: "space"
      });
    } else {
      this.setState({
        selectedSpace: null
      });

      this.selectLocation();
    }
  }

  public render() {
    return (
      <div>
        {this.state.selectionMode === "region" && (
          <div>
            <DmRegionSelect
              onSelect={this.selectRegion}
              onSelectNone={this.selectRegion}
            />
          </div>
        )}
        {this.state.selectionMode === "sector" &&
          !isNil(this.state.selectedRegion) && (
            <div>
              <JxButton
                label="Select Region"
                icon="ArrowLeftCircle"
                iconOnLeft={true}
                onClick={this.goToRegionSelect}
                viz="mortal"
              />
              <DmSectorSelect
                region={this.state.selectedRegion}
                onSelect={this.selectSector}
              />
            </div>
          )}
        {this.state.selectionMode === "space" &&
          !isNil(this.state.selectedSector) && (
            <div>
              <JxButton
                label="Select Sector"
                icon="ArrowLeftCircle"
                onClick={this.goToSectorSelect}
                viz="mortal"
              />
              <DmSpaceSelect
                sector={this.state.selectedSector}
                onSelect={this.selectSpace}
              />
            </div>
          )}
      </div>
    );
  }
}
