import React from 'react';
import {
    TodoArrayHelper,
    ArrayController,
} from './TodoContext/TodoArrayHelper';
import { TodoGroup } from '../objects/TodoGroup';
import Group from './Group';
import FormPopup from './FormPopup';
import { Button, Grid } from '@material-ui/core';
import NewGroupForm from './NewGroupForm';

const TodoGroupsList = () => {
    const [open, setOpen] = React.useState(false);

    const closeForm = () => setOpen(false);
    const openForm = () => setOpen(true);

    return (
        <TodoArrayHelper arrayPath={`groups`}>
            {(controller: ArrayController<TodoGroup>) => {
                return (
                    <Grid container spacing={2}>
                        <Grid container spacing={2}>
                            {controller.array.map((group: TodoGroup) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    xl={2}
                                    container
                                    justify="center"
                                >
                                    <Group groupId={group.id} key={group.id} />
                                </Grid>
                            ))}
                        </Grid>
                        <Grid container>
                            <FormPopup open={open} onClickAway={closeForm}>
                                <div style={{ width: 400 }}>
                                    <NewGroupForm closePopup={closeForm} />
                                </div>
                            </FormPopup>
                            <Button onClick={openForm}>Add new group</Button>
                        </Grid>
                    </Grid>
                );
            }}
        </TodoArrayHelper>
    );
};

export default TodoGroupsList;
