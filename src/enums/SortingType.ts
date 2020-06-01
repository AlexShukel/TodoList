import { EnumSortTypes } from '../components/FilterPanel';
import { TodoTask } from '../objects/TodoTask';

export enum SortingType {
    ALPH = 'ALPH',
}

export const defaultI18n = {
    ALPH: 'Alphabetical',
};

export const sortingTypes: EnumSortTypes<typeof SortingType, TodoTask> = {
    ALPH: {
        title: 'Alphabetical',
        compare: (a: TodoTask, b: TodoTask) =>
            a.description.localeCompare(b.description),
    },
};
