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
import { withI18n } from './i18n/I18n';

const defaultI18n = {
    dateWasntDefined: `Date wasn't defined`,
    timeIsUp: 'Time is up',
};

type I18n = typeof defaultI18n;

interface Props {
    taskIndex: number;
    groupIndex: number;
    i18n: I18n;
}

class _TodoItem extends React.Component<Props> {
    public render() {
        const { taskIndex, i18n } = this.props;
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
                                    : i18n.dateWasntDefined
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
                                {controller.array[taskIndex].description}
                            </TextEditor>
                        </ListItemText>
                        {controller.array[taskIndex].targetDate && (
                            <ListItemText disableTypography>
                                {controller.array[
                                    taskIndex
                                ].targetDate.getTime() <
                                new Date().getTime() ? (
                                    <Typography
                                        className={styles['time-up']}
                                        style={{ width: 200 }}
                                    >
                                        {i18n.timeIsUp}{' '}
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

const TodoItem = withI18n(_TodoItem, defaultI18n, 'TodoItem');
export default TodoItem;
