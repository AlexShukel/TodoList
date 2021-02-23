import React from 'react';
import {
    TodoArrayHelper,
    ArrayController,
} from '../TodoContext/TodoArrayHelper';
import { TodoGroup } from '../../objects/TodoGroup';
import TextEditor from '../TextEditor';
import TodoList from '../todoComponents/TodoList';
import { Typography } from '@material-ui/core';
import NewTaskButton from '../forms/NewTaskButton';

interface Props {
    groupId: number;
}

export default class GroupPage extends React.Component<Props> {
    public render() {
        const { groupId } = this.props;
        return (
            <TodoArrayHelper arrayPath={`groups`}>
                {(controller: ArrayController<TodoGroup>) => {
                    const groupIndex = controller.array.findIndex(
                        (value) => value.id === groupId
                    );
                    return (
                        <div>
                            <Typography variant="h2">
                                <TextEditor
                                    maxTextWidth={500}
                                    initialText={
                                        controller.array[groupIndex].title
                                    }
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

                            <TodoList
                                groupIndex={groupIndex}
                                maxHeight={500}
                                maxTextWidth={350}
                                showMultilineText
                            />

                            <NewTaskButton groupIndex={groupIndex} />
                        </div>
                    );
                }}
            </TodoArrayHelper>
        );
    }
}
