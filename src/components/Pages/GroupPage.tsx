import React from 'react';
import {
    TodoArrayHelper,
    ArrayController,
} from '../TodoContext/TodoArrayHelper';
import { TodoGroup } from '../../objects/TodoGroup';
import { Typography } from '@material-ui/core';
import TodoList from '../TodoList';
import TextEditor from '../TextEditor';

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
                            >
                                <Typography variant="h1">
                                    {controller.array[groupIndex].title}
                                </Typography>
                            </TextEditor>

                            <TodoList groupIndex={groupIndex} />
                        </div>
                    );
                }}
            </TodoArrayHelper>
        );
    }
}
