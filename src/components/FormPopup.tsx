import React from 'react';
import { Popover, ClickAwayListener } from '@material-ui/core';

interface Props {
    children: React.ReactNode;
    onClickAway: () => void;
    open: boolean;
}

const FormPopup = ({ children, onClickAway, open }: Props) => {
    return (
        <Popover
            open={open}
            anchorReference={'none'}
            classes={{
                root: 'center-aligner',
            }}
        >
            <ClickAwayListener onClickAway={onClickAway}>
                {children}
            </ClickAwayListener>
        </Popover>
    );
};

export default FormPopup;
