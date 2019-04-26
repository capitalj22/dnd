import * as React from 'react';
import { JxButton } from 'src/common/button/jx-button';
import { JxButtonGroup } from 'src/common/button/jx-button-group';

export class DmSceneTypeSelect extends React.Component {
    public render() {
        return (<div>
            <JxButtonGroup>
                <JxButton label="Location"/>
            </JxButtonGroup>
        </div>)
    }
}