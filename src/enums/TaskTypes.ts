import { EnumBundle } from '.';

export enum TaskTypes {
    NONE = 'NONE',
    WORK = 'WORK',
    FAML = 'FAML',
    HOME = 'HOME',
    EDUC = 'EDUC',
}

const TaskTypesI18n = {
    NONE: 'None',
    WORK: 'Work',
    FAML: 'Family',
    HOME: 'Home',
    EDUC: 'Education',
};

export const TaskTypesBundle: EnumBundle<typeof TaskTypes> = {
    defaultI18n: TaskTypesI18n,
    values: TaskTypes,
    name: 'TaskTypes',
};
