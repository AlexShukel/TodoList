import React from 'react';
import { Grid, GridSize } from '@material-ui/core';
import styles from './Label.scss';

interface Props {
    label?: string;
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
}: Props) => {
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
            >
                {label}
                {!vertical && ':'}
                {required && '*'}
            </Grid>

            <Grid item>{children}</Grid>
        </Grid>
    );
};

export default Label;
