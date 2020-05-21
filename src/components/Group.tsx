import React from 'react';
import {
    TodoArrayHelper,
    ArrayController,
} from './TodoContext/TodoArrayHelper';
import { TodoGroup } from '../objects/TodoGroup';
import styles from './Group.scss';
import TodoList from './TodoList';
import {
    Button,
    Paper,
    TextField,
    IconButton,
    Icon,
    Typography,
} from '@material-ui/core';
import TextEditor from './TextEditor';

interface Props {
    groupIndex: number;
}

export default class Group extends React.Component<Props> {
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
                            <TextEditor
                                text={controller.array[groupIndex].title}
                                onChange={(text) => {
                                    controller.edit(
                                        {
                                            ...controller.array[groupIndex],
                                            title: text,
                                        },
                                        groupIndex
                                    );
                                }}
                            >
                                <Typography variant="h2">
                                    {controller.array[groupIndex].title}
                                </Typography>
                            </TextEditor>

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
