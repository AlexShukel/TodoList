import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { useI18n } from '../I18nContext';

const defaultI18n = {
    confirmAction: 'Confirm action',
    yes: 'YES',
    no: 'NO',
};

interface Props {
    resolve: (ans: boolean) => void;
    message: string;
}

export const ConfirmPopup = ({ message, resolve }: Props) => {
    const i18n = useI18n(defaultI18n, 'ConfirmPopup');
    return (
        <React.Fragment>
            <DialogTitle>{i18n.confirmAction}</DialogTitle>
            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => resolve(true)}>
                    {i18n.yes}
                </Button>
                <Button color="primary" onClick={() => resolve(false)}>
                    {i18n.no}
                </Button>
            </DialogActions>
        </React.Fragment>
    );
};
