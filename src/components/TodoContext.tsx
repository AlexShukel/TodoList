import React from 'react';
import { AppData } from '../objects/AppData';
import { getIn, setIn } from 'formik';

const TodoContext = React.createContext(
    {} as AppData & { setValues: (values: AppData) => void }
);
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
        this.context.setValues(
            setIn(this.context, `${this.props.arrayPath}.${index}`, value)
        );
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

export default TodoContext;
