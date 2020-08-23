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
    Tooltip,
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
import DateWithTooltip from './DateWithTooltip';

interface Props {
    taskIndex: number;
    groupIndex: number;
}

const TodoItem = ({ taskIndex, groupIndex }: Props) => {
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
                            size="small"
                        />
                    </ListItemIcon>
                    <ListItemText
                        className={
                            controller.array[taskIndex].completed
                                ? styles.done
                                : ''
                        }
                        secondaryTypographyProps={{
                            component: 'div',
                        }}
                        secondary={
                            <DateWithTooltip
                                date={controller.array[taskIndex].targetDate}
                            />
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

                    <ListItemSecondaryAction>
                        <IconButton
                            onClick={() => controller.remove(taskIndex)}
                        >
                            <Icon fontSize="small">delete</Icon>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )}
        </TodoArrayHelper>
    );
};

export default TodoItem;
