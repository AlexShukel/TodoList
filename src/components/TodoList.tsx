import React from 'react';
import {
    TodoArrayHelper,
    ArrayController,
} from './TodoContext/TodoArrayHelper';
import { TodoTask } from '../objects/TodoTask';
import TodoItem from './TodoItem';
import { Button, Menu, List } from '@material-ui/core';
import styles from './TodoList.scss';
import NewTaskForm from './NewTaskForm';
import FilterPanel from './FilterPanel';

interface Props {
    groupIndex: number;
}

export default class TodoList extends React.Component<Props> {
    public render() {
        const { groupIndex } = this.props;
        return (
            <TodoArrayHelper arrayPath={`groups.${groupIndex}.tasks`}>
                {(controller: ArrayController<TodoTask>) => {
                    return (
                        <div>
                            <List className={styles['item-style']}>
                                {controller.array.map(
                                    (todo: TodoTask, index) => {
                                        return (
                                            <TodoItem
                                                taskIndex={index}
                                                groupIndex={groupIndex}
                                                key={todo.id}
                                            />
                                        );
                                    }
                                )}
                            </List>

                            <FilterPanel
                                arrayPath={`groups.${groupIndex}.tasks`}
                                sortingTypes={[
                                    {
                                        title: 'Alphabetical',
                                        compare: (a: TodoTask, b: TodoTask) =>
                                            a.description.localeCompare(
                                                b.description
                                            ),
                                    },
                                ]}
                                defaultCompare={(a: TodoTask, b: TodoTask) =>
                                    b.id - a.id
                                }
                            />
                            <NewTaskForm groupIndex={groupIndex} />
                        </div>
                    );
                }}
            </TodoArrayHelper>
        );
    }
}
