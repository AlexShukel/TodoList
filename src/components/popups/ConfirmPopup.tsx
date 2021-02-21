import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';
import React from 'react';
import { useI18n } from '../I18nContext';

const defaultI18n = {
    confirmAction: 'Confirm action',
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
            <DialogContent>{message}</DialogContent>
            <DialogActions>
                <Button onClick={() => resolve(true)}>YES</Button>
                <Button onClick={() => resolve(false)}>NO</Button>
            </DialogActions>
        </React.Fragment>
    );
};
