import { EnumSortTypes } from '../components/FilterPanel';
import { TodoTask } from '../objects/TodoTask';

export enum SortingType {
    ALPH = 'ALPH',
    DATE = 'DATE',
}

export const defaultI18n = {
    ALPH: 'Alphabetical',
    DATE: 'By date',
};

export const sortingTypes: EnumSortTypes<typeof SortingType, TodoTask> = {
    ALPH: {
        title: 'Alphabetical',
        compare: (a: TodoTask, b: TodoTask) =>
            a.description.localeCompare(b.description),
    },
    DATE: {
        title: 'Dates',
        compare: (a: TodoTask, b: TodoTask) =>
            a.targetDate.getTime() - b.targetDate.getTime(),
    },
};
