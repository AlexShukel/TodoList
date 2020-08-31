import React from 'react';
import {
    TodoArrayHelper,
    ArrayController,
} from '../TodoContext/TodoArrayHelper';
import { TodoGroup } from '../../objects/TodoGroup';
import Group from './Group';
import FormPopup from '../FormPopup';
import { Button } from '@material-ui/core';
import NewGroupForm from '../forms/NewGroupForm';

import styles from './TodoGroupsList.scss';

const TodoGroupsList = () => {
    const [open, setOpen] = React.useState(false);

    const closeForm = () => setOpen(false);
    const openForm = () => setOpen(true);

    return (
        <TodoArrayHelper arrayPath={`groups`}>
            {(controller: ArrayController<TodoGroup>) => {
                return (
                    <div className={styles['container']}>
                        {controller.array.map((group: TodoGroup) => (
                            <div
                                key={group.id}
                                className={styles['container__item']}
                            >
                                <Group groupId={group.id} />
                            </div>
                        ))}

                        <div className={styles['container__item']}>
                            <FormPopup open={open} onClickAway={closeForm}>
                                <div style={{ width: 400 }}>
                                    <NewGroupForm closePopup={closeForm} />
                                </div>
                            </FormPopup>
                            <Button onClick={openForm}>Add new group</Button>
                        </div>
                    </div>
                );
            }}
        </TodoArrayHelper>
    );
};

export default TodoGroupsList;
