import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemSecondaryAction,
    IconButton,
    Icon,
} from '@material-ui/core';
import { TodoTask } from '../../objects/TodoTask';
import styles from './TodoItem.scss';
import {
    TodoArrayHelper,
    ArrayController,
} from '../TodoContext/TodoArrayHelper';
import TextEditor from '../TextEditor';
import TargetDate from '../TargetDate';
import classNames from 'classnames';

interface Props {
    taskIndex: number;
    groupIndex: number;
    maxTextWidth: number;
}

const TodoItem = ({ taskIndex, groupIndex, maxTextWidth }: Props) => {
    return (
        <TodoArrayHelper arrayPath={`groups.${groupIndex}.tasks`}>
            {(controller: ArrayController<TodoTask>) => (
                <ListItem
                    className={classNames(
                        styles.todoItemStyle,
                        `${controller.array[taskIndex].priority}__border`
                    )}
                >
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
                            <TargetDate
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
                            className="edit-text"
                            maxTextWidth={maxTextWidth}
                            multiline
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
