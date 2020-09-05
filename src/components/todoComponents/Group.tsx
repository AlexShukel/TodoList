import React from 'react';
import {
    TodoArrayHelper,
    ArrayController,
} from '../TodoContext/TodoArrayHelper';
import { TodoGroup } from '../../objects/TodoGroup';
import styles from './Group.scss';
import TodoList from './TodoList';
import {
    Button,
    Paper,
    Typography,
    Icon,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
} from '@material-ui/core';
import TextEditor from '../TextEditor';
import FilterPanel from '../FilterPanel';
import NewTaskForm from '../forms/NewTaskForm';
import { sortingTypes, SortingType } from '../../enums/SortingTypes';
import { TodoTask } from '../../objects/TodoTask';
import { useI18n } from '../I18nContext';
import TargetDate from '../TargetDate';
import ButtonsContainer from '../ButtonsContainer';

const defaultI18n = {
    delete: 'Delete',
    addNewTask: 'Add new task',
    newTask: 'New task',
};

interface Props {
    groupId: number;
}

const Group = ({ groupId }: Props) => {
    const [showForm, setShowForm] = React.useState(false);
    const i18n = useI18n(defaultI18n, 'Group');

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);

    return (
        <TodoArrayHelper arrayPath={`groups`}>
            {(controller: ArrayController<TodoGroup>) => {
                const groupIndex = controller.array.findIndex(
                    (value) => value.id === groupId
                );
                return (
                    <Paper className={styles.groupItem} elevation={3} square>
                        <Typography variant="h2">
                            <TextEditor
                                maxTextWidth={310}
                                initialText={controller.array[groupIndex].title}
                                onChange={(text) => {
                                    controller.edit(
                                        {
                                            ...controller.array[groupIndex],
                                            title: text,
                                        },
                                        groupIndex
                                    );
                                }}
                                className="edit-text"
                            />
                        </Typography>

                        <TargetDate
                            date={controller.array[groupIndex].targetDate}
                        />

                        <FilterPanel
                            arrayPath={`groups.${groupIndex}.tasks`}
                            sortingTypes={sortingTypes}
                            defaultCompare={(a: TodoTask, b: TodoTask) =>
                                b.id - a.id
                            }
                            values={SortingType}
                        />

                        <TodoList groupIndex={groupIndex} />

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

                        <Button
                            onClick={() => {
                                controller.remove(groupIndex);
                            }}
                            startIcon={<Icon>delete</Icon>}
                        >
                            {i18n.delete}
                        </Button>
                    </Paper>
                );
            }}
        </TodoArrayHelper>
    );
};

export default Group;
