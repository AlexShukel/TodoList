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

interface Props {
    taskIndex: number;
    groupIndex: number;
}

interface State {
    editDescription: boolean;
}

class TodoItem extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { editDescription: false };
    }
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
                            {this.state.editDescription === false ? (
                                <label
                                    onDoubleClick={() => {
                                        this.setState({
                                            editDescription: true,
                                        });
                                    }}
                                >
                                    {controller.array[taskIndex].description}
                                </label>
                            ) : (
                                <div>
                                    <TextField
                                        value={
                                            controller.array[taskIndex]
                                                .description
                                        }
                                        onChange={(event) => {
                                            controller.edit(
                                                {
                                                    ...controller.array[
                                                        taskIndex
                                                    ],
                                                    description:
                                                        event.target.value,
                                                },
                                                taskIndex
                                            );
                                        }}
                                    ></TextField>
                                    <Button
                                        onClick={() => {
                                            this.setState({
                                                editDescription: false,
                                            });
                                        }}
                                    >
                                        Change Description
                                    </Button>
                                </div>
                            )}
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
