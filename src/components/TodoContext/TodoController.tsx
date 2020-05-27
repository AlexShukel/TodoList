import React from 'react';
import { AppData } from '../../objects/AppData';
import TodoContext from './TodoContext';

interface TodoControllerProps {
    initialValues: AppData;
}

export class TodoController extends React.Component<
    TodoControllerProps,
    AppData
> {
    constructor(props: TodoControllerProps) {
        super(props);
        this.state = props.initialValues;
    }
    private setValues = (values: AppData) => {
        this.setState(values);
    };
    public render() {
        return (
            <TodoContext.Provider
                value={{ ...this.state, setValues: this.setValues }}
            >
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}
