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
import { useI18n } from './I18nContext';

const defaultI18n = {
    dateWasntDefined: `Date wasn't defined`,
    timeIsUp: 'Time is up',
};

interface Props {
    taskIndex: number;
    groupIndex: number;
}

const TodoItem = ({ taskIndex, groupIndex }: Props) => {
    const i18n = useI18n(defaultI18n, 'TodoItem');
    return (
        <TodoArrayHelper arrayPath={`groups.${groupIndex}.tasks`}>
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
                            controller.array[taskIndex].completed
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
                            initialText={
                                controller.array[taskIndex].description
                            }
                            onChange={(text) => {
                                controller.edit(
                                    {
                                        ...controller.array[taskIndex],
                                        description: text,
                                    },
                                    taskIndex
                                );
                            }}
                            maxTextWidth={170}
                        />
                    </ListItemText>
                    {controller.array[taskIndex].targetDate && (
                        <ListItemText disableTypography>
                            {controller.array[taskIndex].targetDate.getTime() <
                            new Date().getTime() ? (
                                <Typography
                                    className={styles['time-up']}
                                    style={{ width: 200 }}
                                >
                                    {i18n.timeIsUp}{' '}
                                    {moment(
                                        controller.array[taskIndex].targetDate
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
};

export default TodoItem;
