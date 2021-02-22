import React from 'react';
import { PaperProps, Paper, DialogTitle, Typography } from '@material-ui/core';
import Draggable from 'react-draggable';

export const PaperComponent = (props: PaperProps) => (
    <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
    >
        <Paper {...props} />
    </Draggable>
);

export const DefaultTitle = ({ title }: { title: string }) => {
    return (
        <DialogTitle
            disableTypography
            id="draggable-dialog-title"
            className="draggable"
        >
            <Typography variant="h5">{title}</Typography>
        </DialogTitle>
    );
};
