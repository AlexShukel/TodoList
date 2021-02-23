import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import styles from './App.scss';
import { TodoController } from './components/TodoContext/TodoController';
import TodoGroupsList from './components/todoComponents/TodoGroupsList';
import SideBar from './components/SideBar';
import Router from './components/Router/Router';
import Route from './components/Router/Route';
import GroupPage from './components/Pages/GroupPage';
import SettingsPage from './components/Pages/SettingsPage';
import moment from 'moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TodoContext from './components/TodoContext/TodoContext';
import { I18nContext } from './components/I18nContext';
import { translations, localeMap } from '../translations';
import { theme } from './MaterialTheme';
import { ConfirmPopupProvider } from './components/popups/ConfirmPopupProvider';

import './sass/styles.g.scss';
import './sass/colors.g.scss';

const App = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Router initialPage="groups">
                <TodoController>
                    <TodoContext.Consumer>
                        {({ language }) => {
                            moment.locale(language);
                            // TODO make getting translations from server
                            // const translation = await getTranslation(language)
                            return (
                                <I18nContext.Provider
                                    value={translations[language]}
                                >
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                        locale={localeMap[language]}
                                    >
                                        <ConfirmPopupProvider>
                                            <div
                                                className={
                                                    styles['app-wrapper']
                                                }
                                            >
                                                <SideBar />
                                                <Route location="groups">
                                                    {() => <TodoGroupsList />}
                                                </Route>
                                                <Route location="group">
                                                    {(params) => (
                                                        <GroupPage
                                                            groupId={
                                                                +params.groupId
                                                            }
                                                        />
                                                    )}
                                                </Route>
                                                <Route location="settings">
                                                    {() => (
                                                        <SettingsPage
                                                            initialLanguage={
                                                                language
                                                            }
                                                        />
                                                    )}
                                                </Route>
                                            </div>
                                        </ConfirmPopupProvider>
                                    </MuiPickersUtilsProvider>
                                </I18nContext.Provider>
                            );
                        }}
                    </TodoContext.Consumer>
                </TodoController>
            </Router>
        </MuiThemeProvider>
    );
};

export default App;
