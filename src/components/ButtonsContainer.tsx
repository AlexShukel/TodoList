import React from 'react';
import { useI18n } from './I18nContext';
import { Button } from '@material-ui/core';

const defaultI18n = {
    add: 'Add',
    cancel: 'Cancel',
};

interface Props {
    closeForm: () => void;
    errors: boolean;
}

const ButtonsContainer = ({ closeForm, errors }: Props) => {
    const i18n = useI18n(defaultI18n, 'ButtonsContainer');

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                width: '100%',
            }}
        >
            <Button
                onClick={!errors ? closeForm : null}
                color="primary"
                type="submit"
            >
                {i18n.add}
            </Button>
            <Button onClick={closeForm} color="primary">
                {i18n.cancel}
            </Button>
        </div>
    );
};

export default ButtonsContainer;
