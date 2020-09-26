import { EnumBundle } from '.';
import { EnumSortTypes } from '../components/FilterPanel';
import { TodoTask } from '../objects/TodoTask';
import { priorityValues } from './PriorityEnum';

const MIN_DATE_TIME = new Date(-8640000000000000).getTime();

export enum SortingType {
    ALPH = 'ALPH',
    DATE = 'DATE',
    PRIO = 'PRIO',
}

const SortingTypeI18n = {
    ALPH: 'Alphabetical',
    DATE: 'By date',
    PRIO: 'By priority',
};

export const SortingTypesBundle: EnumBundle<typeof SortingType> = {
    values: SortingType,
    defaultI18n: SortingTypeI18n,
    name: 'SortingTypes',
};

export const sortingTypes: EnumSortTypes<typeof SortingType, TodoTask> = {
    ALPH: {
        title: 'Alphabetical',
        compare: (a: TodoTask, b: TodoTask) =>
            a.description.localeCompare(b.description),
    },
    DATE: {
        title: 'Dates',
        compare: (a: TodoTask, b: TodoTask) => {
            return (
                (a.targetDate ? a.targetDate.getTime() : MIN_DATE_TIME) -
                (b.targetDate ? b.targetDate.getTime() : MIN_DATE_TIME)
            );
        },
    },
    PRIO: {
        title: 'Priority',
        compare: (a: TodoTask, b: TodoTask) =>
            priorityValues[a.priority] - priorityValues[b.priority],
    },
};
