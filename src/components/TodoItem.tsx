import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {
    Button,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemSecondaryAction,
    IconButton,
    Icon,
    TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { TodoTask } from '../objects/TodoTask';
import styles from './TodoItem.scss';
import { TodoArrayHelper, ArrayController } from './TodoContext';
import TextEditor from './TextEditor';

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
                        >
                            <strong>{controller.array[taskIndex].id}</strong>
                            &nbsp;
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
