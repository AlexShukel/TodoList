import React from 'react';
import {
    TodoArrayHelper,
    ArrayController,
} from '../TodoContext/TodoArrayHelper';
import { TodoTask } from '../../objects/TodoTask';
import TodoItem from './TodoItem';
import { List, Typography } from '@material-ui/core';
import styles from './TodoList.scss';
import { useI18n } from '../I18nContext';

const defaultI18n = {
    thereArentAnyTasks: `There aren't any tasks`,
};

interface Props {
    groupIndex: number;
    maxTextWidth: number;
    maxHeight?: number;
    showFullHeight?: boolean;
    showMultilineText?: boolean;
}

const TodoList = ({
    groupIndex,
    maxHeight = 166,
    maxTextWidth,
    showFullHeight,
    showMultilineText,
}: Props) => {
    const i18n = useI18n(defaultI18n, 'TodoList');
    return (
        <TodoArrayHelper arrayPath={`groups.${groupIndex}.tasks`}>
            {(controller: ArrayController<TodoTask>) => {
                return (
                    <div
                        style={{
                            maxHeight: !showFullHeight ? maxHeight : undefined,
                            height: showFullHeight ? maxHeight : undefined,
                            padding: '8px 0',
                        }}
                        className="center-aligner"
                    >
                        {controller.array.length > 0 ? (
                            <List
                                style={{ maxHeight, width: '100%' }}
                                className={styles.list}
                            >
                                {controller.array.map(
                                    (todo: TodoTask, index) => {
                                        return (
                                            <TodoItem
                                                taskIndex={index}
                                                groupIndex={groupIndex}
                                                maxTextWidth={maxTextWidth}
                                                key={`${groupIndex}__${todo.id}`}
                                                showMultilineText={
                                                    showMultilineText
                                                }
                                            />
                                        );
                                    }
                                )}
                            </List>
                        ) : (
                            <Typography variant="overline">
                                {i18n.thereArentAnyTasks}
                            </Typography>
                        )}
                    </div>
                );
            }}
        </TodoArrayHelper>
    );
};

export default TodoList;
