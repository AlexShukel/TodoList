import React, { useState } from 'react';
import Label, { LabelProps } from './Label';
import { Checkbox } from '@material-ui/core';

interface Props extends LabelProps {
    children: (enabled: boolean) => React.ReactNode;
}

const EnableAbleContainer = ({ label, children, ...other }: Props) => {
    const [enabled, setEnabled] = useState(false);
    return (
        <Label
            {...other}
            label={
                <React.Fragment>
                    <Checkbox
                        size="small"
                        onClick={() => setEnabled(!enabled)}
                    />
                    {label}
                </React.Fragment>
            }
        >
            {enabled && children(enabled)}
        </Label>
    );
};

export default EnableAbleContainer;
