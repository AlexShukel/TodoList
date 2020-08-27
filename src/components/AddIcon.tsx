import React from 'react';
import { IconButton, Icon } from '@material-ui/core';

const AddIcon = () => {
    return (
        <IconButton type="submit">
            <Icon style={{ color: 'green' }}>add</Icon>
        </IconButton>
    );
};

export default AddIcon;
