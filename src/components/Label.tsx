import React from 'react';
import { Grid, GridSize, Typography } from '@material-ui/core';
import styles from './Label.scss';

export interface LabelProps {
    label?: React.ReactNode;
    vertical?: boolean;
    required?: boolean;
    children?: React.ReactNode;
    labelWidth?: number;
}

const Label = ({
    label,
    vertical,
    required,
    children,
    labelWidth = 3,
}: LabelProps) => {
    return (
        <Grid
            container
            item
            style={vertical && { width: 'auto' }}
            direction={vertical ? 'column' : 'row'}
            justify="center"
        >
            <Grid
                className={styles.label}
                item
                xs={vertical ? 12 : (labelWidth as GridSize)}
                container
                alignItems="center"
                justify="flex-end"
            >
                <Typography variant="body1">
                    {label}
                    {!vertical && ':'}
                    {required && '*'}
                </Typography>
            </Grid>

            <Grid item xs={vertical ? 12 : ((12 - labelWidth) as GridSize)}>
                {children}
            </Grid>
        </Grid>
    );
};

export default Label;
