import React from 'react';
import {
    TodoArrayHelper,
    ArrayController,
} from './TodoContext/TodoArrayHelper';
import { TodoGroup } from '../objects/TodoGroup';
import Group from './Group';
import styles from './TodoGroupsList.scss';
import FormPopup from './FormPopup';
import { Button } from '@material-ui/core';
import NewGroupForm from './NewGroupForm';

const TodoGroupsList = () => {
    const [open, setOpen] = React.useState(false);

    const closeForm = () => setOpen(false);
    const openForm = () => setOpen(true);

    return (
        <TodoArrayHelper arrayPath={`groups`}>
            {(controller: ArrayController<TodoGroup>) => {
                return (
                    <div className={styles.groupsList}>
                        {controller.array.map((group: TodoGroup) => (
                            <Group groupId={group.id} key={group.id} />
                        ))}
                        <FormPopup open={open} onClickAway={closeForm}>
                            <div style={{ width: 400 }}>
                                <NewGroupForm />
                            </div>
                        </FormPopup>
                        <Button onClick={openForm}>Add new group</Button>
                    </div>
                );
            }}
        </TodoArrayHelper>
    );
};

export default TodoGroupsList;
