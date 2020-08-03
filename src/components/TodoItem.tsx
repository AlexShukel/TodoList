import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemSecondaryAction,
    IconButton,
    Icon,
    Typography,
} from '@material-ui/core';
import { TodoTask } from '../objects/TodoTask';
import styles from './TodoItem.scss';
import {
    TodoArrayHelper,
    ArrayController,
} from './TodoContext/TodoArrayHelper';
import TextEditor from './TextEditor';
import { dateToYearMonthDay } from '../utils/DateUtils';
import moment from 'moment';

interface Props {
    taskIndex: number;
    groupIndex: number;
}

class TodoItem extends React.Component<Props> {
    public render() {
        const { taskIndex } = this.props;
        return (
            <TodoArrayHelper
                arrayPath={`groups.${this.props.groupIndex}.tasks`}
            >
                {(controller: ArrayController<TodoTask>) => (
                    <ListItem className={styles.todoItemStyle}>
                        <ListItemIcon>
                            <Checkbox
                                onChange={(event) => {
                                    controller.edit(
                                        {
                                            ...controller.array[taskIndex],
                                            completed: event.target.checked,
                                        },
                                        taskIndex
                                    );
                                }}
                                checked={controller.array[taskIndex].completed}
                            />
                        </ListItemIcon>
                        <ListItemText
                            className={
                                controller.array[this.props.taskIndex].completed
                                    ? styles.done
                                    : ''
                            }
                            secondary={
                                controller.array[taskIndex].targetDate
                                    ? dateToYearMonthDay(
                                          controller.array[taskIndex].targetDate
                                      )
                                    : `Date wasn't defined`
                            }
                        >
                            <TextEditor
                                text={controller.array[taskIndex].description}
                                onChange={(text) => {
                                    controller.edit(
                                        {
                                            ...controller.array[taskIndex],
                                            description: text,
                                        },
                                        taskIndex
                                    );
                                }}
                                enableEllipsis
                            >
                                <label>
                                    {controller.array[taskIndex].description}
                                </label>
                            </TextEditor>
                        </ListItemText>
                        {controller.array[taskIndex].targetDate && (
                            <ListItemText>
                                {controller.array[
                                    taskIndex
                                ].targetDate.getTime() <
                                new Date().getTime() ? (
                                    <Typography className={styles['time-up']}>
                                        Time is up{' '}
                                        {moment(
                                            controller.array[taskIndex]
                                                .targetDate
                                        ).fromNow()}
                                    </Typography>
                                ) : null}
                            </ListItemText>
                        )}

                        <ListItemSecondaryAction>
                            <IconButton
                                onClick={() => controller.remove(taskIndex)}
                            >
                                <Icon>delete</Icon>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </TodoArrayHelper>
        );
    }
}

export default TodoItem;
