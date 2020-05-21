import React from 'react';
import { AppData } from '../..//objects/AppData';

const TodoContext = React.createContext(
    {} as AppData & { setValues: (values: AppData) => void }
);

export default TodoContext;
