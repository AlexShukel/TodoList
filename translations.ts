import enLocale from 'date-fns/locale/en-US';
import ruLocale from 'date-fns/locale/ru';
import ltLocale from 'date-fns/locale/lt';

export const localeMap = {
    EN: enLocale,
    RU: ruLocale,
    LT: ltLocale,
};

export const translations = {
    LT: {
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
    },
    EN: {},
    RU: {},
};
