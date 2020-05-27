import React from 'react';
import styles from './App.scss';
import { AppData } from './objects/AppData';
import { TodoController } from './components/TodoContext/TodoController';
import TodoGroupsList from './components/TodoGroupsList';
import NewGroupForm from './components/NewGroupForm';
import SideBar from './components/SideBar';
import Router from './components/Router/Router';
import Route from './components/Router/Route';
import GroupPage from './components/Pages/GroupPage';

let initialState: AppData = {
    groups: [
        {
            id: 1,
            title: 'Go to market',
            targetDate: new Date(),
            tasks: [
                {
                    id: 0,
                    completed: false,
                    description: 'Buy milk',
                    type: 'Important',
                    targetDate: new Date(),
                },
                {
                    id: 1,
                    completed: false,
                    description: 'Buy meat',
                    type: 'Important',
                    targetDate: new Date(),
                },
                {
                    id: 2,
                    completed: true,
                    description: 'Buy bread',
                    type: 'Important',
                    targetDate: new Date(),
                },
            ],
        },
        {
            id: 2,
            title: 'Hello',
            targetDate: new Date(),
            tasks: [
                {
                    id: 0,
                    completed: false,
                    description: 'Buy milk',
                    type: 'Important',
                    targetDate: new Date(),
                },
                {
                    id: 1,
                    completed: false,
                    description: 'Buy meat',
                    type: 'Important',
                    targetDate: new Date(),
                },
                {
                    id: 2,
                    completed: true,
                    description: 'Buy bread',
                    type: 'Important',
                    targetDate: new Date(),
                },
            ],
        },
    ],
};

const App = () => {
    return (
        <Router initialPage="groups">
            <TodoController initialValues={initialState}>
                <div className={styles['app-wrapper']}>
                    <SideBar />
                    <Route location="groups">
                        {() => (
                            <React.Fragment>
                                <TodoGroupsList />

                                <NewGroupForm />
                            </React.Fragment>
                        )}
                    </Route>
                    <Route location="group">
                        {(params) => <GroupPage groupId={+params.groupId} />}
                    </Route>
                </div>
            </TodoController>
        </Router>
    );
};

export default App;
