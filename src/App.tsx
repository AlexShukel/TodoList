import React, { useState } from 'react';
import styles from './App.scss';
import { TodoController } from './components/TodoContext/TodoController';
import TodoGroupsList from './components/TodoGroupsList';
import SideBar from './components/SideBar';
import Router from './components/Router/Router';
import Route from './components/Router/Route';
import GroupPage from './components/Pages/GroupPage';
import SettingsPage from './components/Pages/SettingsPage';
import { I18nContext } from './components/i18n/I18n';
import { Languages } from './enums/Languages';
import moment from 'moment';

const load = (lang: string) => {
    switch (lang) {
        case Languages.LT:
            return {
                NewTaskForm: {
                    description: 'Aprašymas',
                    priority: 'Prioritetas',
                    targetDate: 'Planuojama data',
                    priorityEnum: {
                        LOW: 'Silpnas',
                        MED: 'Vidutinis',
                        IMP: 'Svarbus',
                    },
                },
                TodoItem: {
                    dateWasntDefined: `Data nenustatyta`,
                    timeIsUp: 'Laikas baigėsi',
                },
                SideBar: {
                    settings: 'Nustatymai',
                    addNewGroup: 'Pridėti grupę',
                    myGroups: 'Mano grupės',
                },
                Group: {
                    delete: 'Ištrinti',
                    addNewTask: 'Pridėti užduotį',
                },
                FilterPanel: {
                    sortingType: 'Rūšiavimo tipas',
                    sortingEnum: {
                        ALPH: 'Abėcėlės tvarka',
                        DATE: 'Pagal datą',
                    },
                },
            };
    }
};

const App = () => {
    const [lang, setLang] = useState(Languages.LT);
    moment.locale(lang);
    const loadedI18n = load(lang);

    return (
        <Router initialPage="groups">
            <TodoController>
                <I18nContext.Provider value={loadedI18n}>
                    <div className={styles['app-wrapper']}>
                        <SideBar />
                        <Route location="groups">
                            {() => <TodoGroupsList />}
                        </Route>
                        <Route location="group">
                            {(params) => (
                                <GroupPage groupId={+params.groupId} />
                            )}
                        </Route>
                        <Route location="settings">
                            {() => <SettingsPage />}
                        </Route>
                    </div>
                </I18nContext.Provider>
            </TodoController>
        </Router>
    );
};

export default App;
