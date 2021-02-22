import React from 'react';
import {
    TodoArrayHelper,
    ArrayController,
} from '../TodoContext/TodoArrayHelper';
import { TodoGroup } from '../../objects/TodoGroup';
import styles from './Group.scss';
import TodoList from './TodoList';
import { Button, Typography, Icon, Tooltip, Dialog } from '@material-ui/core';
import TextEditor from '../TextEditor';
import FilterPanel from '../FilterPanel';
import { sortingTypes, SortingType } from '../../enums/SortingTypes';
import { TodoTask } from '../../objects/TodoTask';
import { useI18n } from '../I18nContext';
import TargetDate from '../TargetDate';
import NewTaskButton from '../forms/NewTaskButton';
import classNames from 'classnames';
import { LoadableImage } from '../LoadableImage';
import { RenderEnum } from '../../enums';
import { TaskTypesBundle } from '../../enums/TaskTypes';
import { ConfirmPopup } from '../popups/ConfirmPopup';
import { useConfirmPopup } from '../hooks/useConfirmPopup';

const defaultI18n = {
    delete: 'Delete',
    deletionConfirmMessage: 'Are you sure you want to delete this group?',
};

interface Props {
    groupId: number;
}

const Group = ({ groupId }: Props) => {
    const i18n = useI18n(defaultI18n, 'Group');

    const { closePopup, open, resolve, showConfirmPopup } = useConfirmPopup();

    return (
        <TodoArrayHelper arrayPath={`groups`}>
            {(controller: ArrayController<TodoGroup>) => {
                const groupIndex = controller.array.findIndex(
                    (value) => value.id === groupId
                );
                return (
                    <div
                        className={classNames(
                            styles.groupItem,
                            `${controller.array[groupIndex].priority}__border`
                        )}
                    >
                        <div className={styles['header']}>
                            <div className={styles['header__title']}>
                                <Typography variant="h3">
                                    <TextEditor
                                        maxTextWidth={285}
                                        initialText={
                                            controller.array[groupIndex].title
                                        }
                                        onChange={(text) => {
                                            controller.edit(
                                                {
                                                    ...controller.array[
                                                        groupIndex
                                                    ],
                                                    title: text,
                                                },
                                                groupIndex
                                            );
                                        }}
                                        className="edit-text"
                                    />
                                </Typography>
                            </div>
                            <div className={styles['header__icon']}>
                                <Tooltip
                                    title={
                                        <RenderEnum
                                            enumBundle={TaskTypesBundle}
                                            value={
                                                controller.array[groupIndex]
                                                    .type
                                            }
                                        />
                                    }
                                >
                                    <div>
                                        <LoadableImage
                                            src={`${controller.array[groupIndex].type}.png`}
                                            width={24}
                                            height={24}
                                        />
                                    </div>
                                </Tooltip>
                            </div>
                        </div>

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

                        <TodoList
                            groupIndex={groupIndex}
                            maxTextWidth={160}
                            showFullHeight
                        />

                        <NewTaskButton groupIndex={groupIndex} />

                        <Button
                            onClick={async () => {
                                if (await showConfirmPopup()) {
                                    controller.remove(groupIndex);
                                }
                            }}
                            startIcon={<Icon>delete</Icon>}
                        >
                            {i18n.delete}
                        </Button>

                        <Dialog
                            open={open}
                            onClose={closePopup}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    resolve(true);
                                }
                            }}
                        >
                            <ConfirmPopup
                                resolve={resolve}
                                message={i18n.deletionConfirmMessage}
                            />
                        </Dialog>
                    </div>
                );
            }}
        </TodoArrayHelper>
    );
};

export default Group;
