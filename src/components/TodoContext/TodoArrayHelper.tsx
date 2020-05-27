import React from 'react';
import TodoContext from './TodoContext';
import { setIn, getIn } from 'formik';

export interface ArrayController<T> {
    add: (value: T) => void;
    edit: (value: T, index: number) => void;
    remove: (index: number) => void;
    sort: (compareFn: (a: T, b: T) => number) => void;
    array: T[];
}

interface TodoArrayProps<T> {
    arrayPath: string;
    children: (controller: ArrayController<T>) => React.ReactNode;
}

export class TodoArrayHelper<T> extends React.Component<TodoArrayProps<T>> {
    declare context: React.ContextType<typeof TodoContext>;
    static contextType = TodoContext;
    private array: T[];

    private setContext = () => {
        const { arrayPath } = this.props;
        this.context.setValues(setIn(this.context, arrayPath, this.array));
    };
    private add = (value: T) => {
        this.array.push(value);
        this.setContext();
    };
    private edit = (value: T, index: number) => {
        this.array[index] = value;
        this.setContext();
    };
    private remove = (index: number) => {
        this.array.splice(index, 1);
        this.setContext();
    };
    private sort = (compareFn: (a: T, b: T) => number) => {
        this.array.sort(compareFn);
        this.setContext();
    };
    public componentDidMount() {
        this.array = getIn(this.context, this.props.arrayPath);
    }
    public render() {
        return (
            <TodoContext.Consumer>
                {(value) => {
                    return this.props.children({
                        add: this.add,
                        edit: this.edit,
                        remove: this.remove,
                        sort: this.sort,
                        array: getIn(value, this.props.arrayPath),
                    });
                }}
            </TodoContext.Consumer>
        );
    }
}
