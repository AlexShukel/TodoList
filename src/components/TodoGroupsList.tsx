import React from 'react';
import {
    TodoArrayHelper,
    ArrayController,
} from './TodoContext/TodoArrayHelper';
import { TodoGroup } from '../objects/TodoGroup';
import styles from './TodoGroupsList.scss';
import Group from './Group';

class TodoGroupsList extends React.Component {
    public render() {
        return (
            <TodoArrayHelper arrayPath={`groups`}>
                {(controller: ArrayController<TodoGroup>) => {
                    return (
                        <div className={styles.groupsList}>
                            {controller.array.map((group: TodoGroup, index) => (
                                <Group groupIndex={index} key={group.id} />
                            ))}
                        </div>
                    );
                }}
            </TodoArrayHelper>
        );
    }
}

export default TodoGroupsList;
