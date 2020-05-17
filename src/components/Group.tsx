import React from 'react';
import { TodoArrayHelper, ArrayController } from './TodoContext';
import { TodoGroup } from '../objects/TodoGroup';
import styles from './Group.scss';
import TodoList from './TodoList';
import { Button, Paper, TextField } from '@material-ui/core';

interface Props {
    groupIndex: number;
}

interface State {
    editTitle: boolean;
}

export default class Group extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { editTitle: false };
    }
    public render() {
        const { groupIndex } = this.props;

        return (
            <TodoArrayHelper arrayPath={`groups`}>
                {(controller: ArrayController<TodoGroup>) => {
                    return (
                        <Paper
                            className={styles.groupItem}
                            elevation={3}
                            square
                        >
                            {this.state.editTitle === false ? (
                                <label
                                    onDoubleClick={() => {
                                        this.setState({
                                            editTitle: true,
                                        });
                                    }}
                                >
                                    <h2>
                                        {controller.array[groupIndex].title}
                                    </h2>
                                </label>
                            ) : (
                                <div>
                                    <TextField
                                        value={
                                            controller.array[groupIndex].title
                                        }
                                        onChange={(event) => {
                                            controller.edit(
                                                {
                                                    ...controller.array[
                                                        groupIndex
                                                    ],
                                                    title: event.target.value,
                                                },
                                                groupIndex
                                            );
                                        }}
                                    ></TextField>
                                    <Button
                                        onClick={() => {
                                            this.setState({ editTitle: false });
                                        }}
                                    >
                                        Change title
                                    </Button>
                                </div>
                            )}

                            <TodoList groupIndex={groupIndex} />
                            <Button
                                onClick={() => {
                                    controller.remove(groupIndex);
                                }}
                            >
                                Delete
                            </Button>
                        </Paper>
                    );
                }}
            </TodoArrayHelper>
        );
    }
}
