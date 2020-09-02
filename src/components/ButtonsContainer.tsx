import React from 'react';
import { useI18n } from './I18nContext';
import { Button } from '@material-ui/core';

const defaultI18n = {
    add: 'Add',
    cancel: 'Cancel',
};

interface Props {
    closeForm: () => void;
}

const ButtonsContainer = ({ closeForm }: Props) => {
    const i18n = useI18n(defaultI18n, 'ButtonsContainer');

    return (
        <React.Fragment>
            <Button onClick={closeForm} color="primary" type="submit">
                {i18n.add}
            </Button>
            <Button onClick={closeForm} color="primary">
                {i18n.cancel}
            </Button>
        </React.Fragment>
    );
};

export default ButtonsContainer;
