import React from 'react';
import {
    TodoArrayHelper,
    ArrayController,
} from '../TodoContext/TodoArrayHelper';
import { TodoTask } from '../../objects/TodoTask';
import TodoItem from './TodoItem';
import { List, Typography } from '@material-ui/core';
import styles from './TodoList.scss';
import { useI18n } from '../I18nContext';

const defaultI18n = {
    thereArentAnyTasks: `There aren't any tasks`,
};

interface Props {
    groupIndex: number;
}

const TodoList = ({ groupIndex }: Props) => {
    const i18n = useI18n(defaultI18n, 'TodoList');
    return (
        <TodoArrayHelper arrayPath={`groups.${groupIndex}.tasks`}>
            {(controller: ArrayController<TodoTask>) => {
                return (
                    <div style={{ height: 166 }} className="center-aligner">
                        {controller.array.length > 0 ? (
                            <List className={styles.list}>
                                {controller.array.map(
                                    (todo: TodoTask, index) => {
                                        return (
                                            <TodoItem
                                                taskIndex={index}
                                                groupIndex={groupIndex}
                                                key={`${groupIndex}__${todo.id}`}
                                            />
                                        );
                                    }
                                )}
                            </List>
                        ) : (
                            <Typography>{i18n.thereArentAnyTasks}</Typography>
                        )}
                    </div>
                );
            }}
        </TodoArrayHelper>
    );
};

export default TodoList;
