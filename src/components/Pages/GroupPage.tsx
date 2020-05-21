import React from 'react';
import { TodoArrayHelper, ArrayController } from '../TodoContext';
import { TodoGroup } from '../../objects/TodoGroup';
import { Typography } from '@material-ui/core';
import TodoList from '../TodoList';

interface Props {
    groupIndex: number;
}

export default class GroupPage extends React.Component<Props> {
    public render() {
        const { groupIndex } = this.props;
        return (
            <TodoArrayHelper arrayPath={`groups`}>
                {(controller: ArrayController<TodoGroup>) => {
                    return (
                        <div>
                            <Typography variant="h1">
                                {controller.array[groupIndex].title}
                            </Typography>
                            <TodoList groupIndex={groupIndex} />
                        </div>
                    );
                }}
            </TodoArrayHelper>
        );
    }
}
