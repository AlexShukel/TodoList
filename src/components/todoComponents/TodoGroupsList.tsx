import React from 'react';
import {
    TodoArrayHelper,
    ArrayController,
} from '../TodoContext/TodoArrayHelper';
import { TodoGroup } from '../../objects/TodoGroup';
import Group from './Group';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
} from '@material-ui/core';
import NewGroupForm from '../forms/NewGroupForm';

import styles from './TodoGroupsList.scss';
import { useI18n } from '../I18nContext';
import ButtonsContainer from '../ButtonsContainer';

const defaultI18n = {
    newGroup: 'New group',
};

const TodoGroupsList = () => {
    const i18n = useI18n(defaultI18n, 'TodoGroupsList');
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
                            <Dialog open={open} onClose={closeForm}>
                                <DialogTitle>{i18n.newGroup}</DialogTitle>
                                <DialogContent>
                                    <div style={{ width: 400 }}>
                                        <NewGroupForm closePopup={closeForm} />
                                    </div>
                                </DialogContent>
                            </Dialog>

                            <Button onClick={openForm}>Add new group</Button>
                        </div>
                    </div>
                );
            }}
        </TodoArrayHelper>
    );
};

export default TodoGroupsList;
