import React from 'react';
import styles from './App.scss';
import { TodoController } from './components/TodoContext/TodoController';
import TodoGroupsList from './components/TodoGroupsList';
import SideBar from './components/SideBar';
import Router from './components/Router/Router';
import Route from './components/Router/Route';
import GroupPage from './components/Pages/GroupPage';

const App = () => {
    return (
        <Router initialPage="groups">
            <TodoController>
                <div className={styles['app-wrapper']}>
                    <SideBar />
                    <Route location="groups">{() => <TodoGroupsList />}</Route>
                    <Route location="group">
                        {(params) => <GroupPage groupId={+params.groupId} />}
                    </Route>
                </div>
            </TodoController>
        </Router>
    );
};

export default App;
