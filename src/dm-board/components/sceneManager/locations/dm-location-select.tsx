import { isNil } from "lodash";
import * as React from "react";
import { JxButton } from "src/common/button/jx-button";
import { JxButtonGroup } from "src/common/button/jx-button-group";
import { JxModalBody, JxModalTitle } from "src/common/modal/modal-title";
import { JxSequence, JxSequenceItem } from "src/common/sequence/sequence";
import { SceneManager } from "src/services/sceneManager.service";
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
  // selectedRegion?: number | null;
  // selectedSector?: number | null;
  // selectedSpace?: number | null;
}

export class DmLocationSelect extends React.Component<
  DmLocationSelectProps,
  DmLocationSelectState
> {
  private selectedRegion: number | null | undefined;
  private selectedSector: number | null | undefined;
  private selectedSpace: number | null | undefined;

  constructor(props: any) {
    super(props);
    const currentScene = SceneManager.scene.current();
    this.state = {
      selectionMode: "region"
    };

    this.selectedRegion = currentScene.region && currentScene.region.key;
    this.selectedSector = currentScene.sector && currentScene.sector.key;
    this.selectedSpace = currentScene.space && currentScene.space.key;

    this.selectRegion = this.selectRegion.bind(this);
    this.selectSector = this.selectSector.bind(this);
    this.selectSpace = this.selectSpace.bind(this);
    this.goToRegionSelect = this.goToRegionSelect.bind(this);
    this.goToSectorSelect = this.goToSectorSelect.bind(this);
  }

  public componentDidMount() {
    if (this.selectedSpace || this.selectedSector) {
      this.setState({
        selectionMode: "space"
      });
    } else if (this.selectedRegion) {
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
      region: this.selectedRegion,
      sector: this.selectedSector,
      space: this.selectedSpace
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

  public selectRegion(key?: number) {
    if (!isNil(key)) {
      this.selectedRegion = key;
      this.selectedSector = null;
      this.selectedSpace = null;

      this.setState({
        selectionMode: "sector"
      });
    } else {
      this.selectedRegion = null;
      this.selectedSector = null;
      this.selectedSpace = null;

      this.selectLocation();
    }
  }

  public selectSector(key?: number) {
    if (!isNil(key)) {
      this.selectedSector = key;
      this.selectedSpace = null;
      this.setState({
        selectionMode: "space"
      });
    } else {
      this.selectedSector = null;
      this.selectedSpace = null;

      this.selectLocation();
    }
  }

  public selectSpace(key?: number) {
    this.selectedSpace = key;

    this.selectLocation();
  }

  public render() {
    return (
      <div>
        <JxSequence>
          <JxSequenceItem
            number={1}
            label="Region"
            onClick={this.goToRegionSelect}
            enabled={
              this.state.selectionMode === "sector" ||
              this.state.selectionMode === "space"
            }
            active={this.state.selectionMode === "region"}
          />
          <JxSequenceItem
            number={2}
            label="Sector"
            onClick={this.goToSectorSelect}
            enabled={this.state.selectionMode === "space"}
            active={this.state.selectionMode === "sector"}
          />

          <JxSequenceItem
            number={3}
            label="Space"
            enabled={false}
            active={this.state.selectionMode === "space"}
          />
        </JxSequence>
        {this.state.selectionMode === "region" && (
          <DmRegionSelect
            onSelect={this.selectRegion}
            onSelectNone={this.selectRegion}
          />
        )}
        {this.state.selectionMode === "sector" &&
          !isNil(this.selectedRegion) && (
            <DmSectorSelect
              region={this.selectedRegion}
              onSelectNone={this.selectSector}
              onSelect={this.selectSector}
            />
          )}
        {this.state.selectionMode === "space" &&
          !isNil(this.selectedSector) && (
            <DmSpaceSelect
              sector={this.selectedSector}
              onSelectNone={this.selectSpace}
              onSelect={this.selectSpace}
            />
          )}
      </div>
    );
  }
}
