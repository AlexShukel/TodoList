import React from 'react';
import {
    TodoArrayHelper,
    ArrayController,
} from './TodoContext/TodoArrayHelper';
import { TodoGroup } from '../objects/TodoGroup';
import styles from './Group.scss';
import TodoList from './TodoList';
import { Button, Paper, Typography, Icon } from '@material-ui/core';
import TextEditor from './TextEditor';
import { dateToYearMonthDay } from '../utils/DateUtils';
import FilterPanel from './FilterPanel';
import NewTaskForm from './NewTaskForm';
import { sortingTypes, SortingType } from '../enums/SortingTypes';
import { TodoTask } from '../objects/TodoTask';
import { withI18n } from './I18nContext';

const defaultI18n = {
    delete: 'Delete',
    addNewTask: 'Add new task',
};

type I18n = typeof defaultI18n;

interface Props {
    groupId: number;
    i18n: I18n;
}

interface State {
    isShowingTaskForm: boolean;
}

class _Group extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { isShowingTaskForm: false };
    }

    public render() {
        const { groupId, i18n } = this.props;
        return (
            <TodoArrayHelper arrayPath={`groups`}>
                {(controller: ArrayController<TodoGroup>) => {
                    const groupIndex = controller.array.findIndex(
                        (value) => value.id === groupId
                    );
                    const { isShowingTaskForm } = this.state;
                    return (
                        <Paper
                            className={styles.groupItem}
                            elevation={3}
                            square
                        >
                            <Typography variant="h2">
                                <TextEditor
                                    maxTextWidth={500}
                                    text={controller.array[groupIndex].title}
                                    onChange={(text) => {
                                        controller.edit(
                                            {
                                                ...controller.array[groupIndex],
                                                title: text,
                                            },
                                            groupIndex
                                        );
                                    }}
                                    className={styles['input-style']}
                                >
                                    {controller.array[groupIndex].title}
                                </TextEditor>
                            </Typography>

                            <span
                                className={
                                    new Date().getTime() >
                                    controller.array[
                                        groupIndex
                                    ].targetDate.getTime()
                                        ? styles['date-out']
                                        : styles['date-not-out']
                                }
                            >
                                {dateToYearMonthDay(
                                    controller.array[groupIndex].targetDate
                                )}
                            </span>

                            <FilterPanel
                                arrayPath={`groups.${groupIndex}.tasks`}
                                sortingTypes={sortingTypes}
                                defaultCompare={(a: TodoTask, b: TodoTask) =>
                                    b.id - a.id
                                }
                                values={SortingType}
                            />

                            <TodoList groupIndex={groupIndex} />

                            <Button
                                onClick={() =>
                                    this.setState({
                                        isShowingTaskForm: !isShowingTaskForm,
                                    })
                                }
                                startIcon={
                                    <Icon>
                                        {isShowingTaskForm
                                            ? 'expand_less'
                                            : 'expand_more'}
                                    </Icon>
                                }
                            >
                                {i18n.addNewTask}
                            </Button>

                            {isShowingTaskForm && (
                                <NewTaskForm groupIndex={groupIndex} />
                            )}

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
    }
}

const Group = withI18n(_Group, defaultI18n, 'Group');
export default Group;
