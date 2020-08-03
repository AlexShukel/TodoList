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
import { defaultI18n } from '../enums/PriorityEnum';

interface Props {
    groupId: number;
}

interface State {
    isShowingTaskForm: boolean;
}

export default class Group extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { isShowingTaskForm: false };
    }

    public render() {
        const { groupId } = this.props;

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
                                i18n={defaultI18n}
                            />

                            <TodoList groupIndex={groupIndex} />

                            <Button
                                onClick={() =>
                                    this.setState({
                                        isShowingTaskForm: !isShowingTaskForm,
                                    })
                                }
                            >
                                {isShowingTaskForm
                                    ? 'Close new task form'
                                    : 'Open new task form'}
                                <Icon>
                                    {isShowingTaskForm
                                        ? 'expand_less'
                                        : 'expand_more'}
                                </Icon>
                            </Button>

                            {isShowingTaskForm && (
                                <NewTaskForm groupIndex={groupIndex} />
                            )}

                            <Button
                                onClick={() => {
                                    controller.remove(groupIndex);
                                }}
                            >
                                Delete
                            </Button>
                        </Paper>
                    );
                }}
            </TodoArrayHelper>
        );
    }
}
