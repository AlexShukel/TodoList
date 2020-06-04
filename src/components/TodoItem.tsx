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
                            secondary={dateToYearMonthDay(
                                controller.array[taskIndex].targetDate
                            )}
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
                            >
                                <label>
                                    {controller.array[taskIndex].description}
                                </label>
                            </TextEditor>
                        </ListItemText>
                        <ListItemText>
                            {controller.array[taskIndex].targetDate.getTime() <
                            new Date().getTime() ? (
                                <Typography className={styles['time-up']}>
                                    Time is up{' '}
                                    {Math.round(
                                        (new Date().getTime() -
                                            controller.array[
                                                taskIndex
                                            ].targetDate.getTime()) /
                                            86400000
                                    )}{' '}
                                    days ago
                                </Typography>
                            ) : null}
                        </ListItemText>
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
