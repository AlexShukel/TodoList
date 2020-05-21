import React from 'react';
import styles from './App.scss';
import { AppData } from './objects/AppData';
import { TodoController, TodoArrayHelper } from './components/TodoContext';
import TodoGroupsList from './components/TodoGroupsList';
import NewGroupForm from './components/NewGroupForm';
import { Typography } from '@material-ui/core';
import SideBar from './components/SideBar';

let initialState: AppData = {
    groups: [
        {
            id: 1,
            title: 'Go to market',
            tasks: [
                {
                    id: 0,
                    completed: false,
                    description: 'Buy milk',
                    type: 'Important',
                },
                {
                    id: 1,
                    completed: false,
                    description: 'Buy meat',
                    type: 'Important',
                },
                {
                    id: 2,
                    completed: true,
                    description: 'Buy bread',
                    type: 'Important',
                },
            ],
        },
        {
            id: 2,
            title: 'Go to market',
            tasks: [
                {
                    id: 0,
                    completed: false,
                    description: 'Buy milk',
                    type: 'Important',
                },
                {
                    id: 1,
                    completed: false,
                    description: 'Buy meat',
                    type: 'Important',
                },
                {
                    id: 2,
                    completed: true,
                    description: 'Buy bread',
                    type: 'Important',
                },
            ],
        },
    ],
};

const App = () => {
    return (
        <TodoController initialValues={initialState}>
            <div className={styles['app-wrapper']}>
                <SideBar />

                <Typography variant="h1">TodoApp</Typography>
                <TodoGroupsList />
                <NewGroupForm />
            </div>
        </TodoController>
    );
};

export default App;
