import React from 'react';
import {
    TodoArrayHelper,
    ArrayController,
} from '../TodoContext/TodoArrayHelper';
import { TodoTask } from '../../objects/TodoTask';
import TodoItem from './TodoItem';
import { List } from '@material-ui/core';
import styles from './TodoList.scss';

interface Props {
    groupIndex: number;
}

const TodoList = ({ groupIndex }: Props) => {
    return (
        <TodoArrayHelper arrayPath={`groups.${groupIndex}.tasks`}>
            {(controller: ArrayController<TodoTask>) => {
                return (
                    <div>
                        <List className={styles.list}>
                            {controller.array.map((todo: TodoTask, index) => {
                                return (
                                    <TodoItem
                                        taskIndex={index}
                                        groupIndex={groupIndex}
                                        key={`${groupIndex}__${todo.id}`}
                                    />
                                );
                            })}
                        </List>
                    </div>
                );
            }}
        </TodoArrayHelper>
    );
};

export default TodoList;
