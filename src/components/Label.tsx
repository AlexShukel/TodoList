import React from 'react';
import { Grid } from '@material-ui/core';
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
            xs={labelWidth as any}
            direction={vertical ? 'column' : 'row'}
            justify="center"
        >
            <div className={styles.label}>
                {label}:{required && '*'}
            </div>

            {children}
        </Grid>
    );
};

export default Label;
