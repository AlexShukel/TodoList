import React from 'react';
import styles from './App.scss';
import { TodoController } from './components/TodoContext/TodoController';
import TodoGroupsList from './components/TodoGroupsList';
import SideBar from './components/SideBar';
import Router from './components/Router/Router';
import Route from './components/Router/Route';
import GroupPage from './components/Pages/GroupPage';
import SettingsPage from './components/Pages/SettingsPage';
import moment from 'moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TodoContext from './components/TodoContext/TodoContext';
import { I18nContext } from './components/i18n/I18n';
import { translations, localeMap } from '../translations';

const App = () => {
    return (
        <Router initialPage="settings">
            <TodoController>
                <TodoContext.Consumer>
                    {(value) => {
                        console.log(value.language);
                        moment.locale(value.language);
                        return (
                            <I18nContext.Provider
                                value={translations[value.language]}
                            >
                                <MuiPickersUtilsProvider
                                    utils={DateFnsUtils}
                                    locale={localeMap[value.language]}
                                >
                                    <div className={styles['app-wrapper']}>
                                        <SideBar />
                                        <Route location="groups">
                                            {() => <TodoGroupsList />}
                                        </Route>
                                        <Route location="group">
                                            {(params) => (
                                                <GroupPage
                                                    groupId={+params.groupId}
                                                />
                                            )}
                                        </Route>
                                        <Route location="settings">
                                            {() => (
                                                <SettingsPage
                                                    initialLanguage={
                                                        value.language
                                                    }
                                                />
                                            )}
                                        </Route>
                                    </div>
                                </MuiPickersUtilsProvider>
                            </I18nContext.Provider>
                        );
                    }}
                </TodoContext.Consumer>
            </TodoController>
        </Router>
    );
};

export default App;
