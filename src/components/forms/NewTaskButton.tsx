import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Icon,
} from '@material-ui/core';
import NewTaskForm from './NewTaskForm';
import { useI18n } from '../I18nContext';

const defaultI18n = {
    addNewTask: 'Add new task',
    newTask: 'New task',
};

interface Props {
    groupIndex: number;
}

const NewTaskButton = ({ groupIndex }: Props) => {
    const i18n = useI18n(defaultI18n, 'NewTaskButton');

    const [showForm, setShowForm] = React.useState(false);

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);

    return (
        <React.Fragment>
            <Dialog open={showForm} onClose={closeForm}>
                <DialogTitle>{i18n.newTask}</DialogTitle>
                <DialogContent>
                    <div style={{ width: 400 }}>
                        <NewTaskForm
                            groupIndex={groupIndex}
                            onSubmit={closeForm}
                        />
                    </div>
                </DialogContent>
            </Dialog>

            <Button
                onClick={openForm}
                startIcon={<Icon fontSize="small">add</Icon>}
            >
                {i18n.addNewTask}
            </Button>
        </React.Fragment>
    );
};

export default NewTaskButton;
