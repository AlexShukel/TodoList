import React from 'react';
import {
    TodoArrayHelper,
    ArrayController,
} from './TodoContext/TodoArrayHelper';
import { TodoGroup } from '../objects/TodoGroup';
import styles from './Group.scss';
import TodoList from './TodoList';
import { Button, Paper, Typography } from '@material-ui/core';
import TextEditor from './TextEditor';
import { dateToYearMonthDay } from '../utils/DateUtils';

interface Props {
    groupId: number;
}

export default class Group extends React.Component<Props> {
    public render() {
        const { groupId } = this.props;

        return (
            <TodoArrayHelper arrayPath={`groups`}>
                {(controller: ArrayController<TodoGroup>) => {
                    const groupIndex = controller.array.findIndex(
                        (value) => value.id === groupId
                    );
                    return (
                        <Paper
                            className={styles.groupItem}
                            elevation={3}
                            square
                        >
                            <Typography variant="h2">
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
                                    className={styles['input-style']}
                                >
                                    {controller.array[groupIndex].title}
                                </TextEditor>
                            </Typography>
                            {dateToYearMonthDay(
                                controller.array[groupIndex].targetDate
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
