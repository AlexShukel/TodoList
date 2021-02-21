import { EnumBundle, EnumI18n } from '.';

export enum TaskTypes {
    ANTH = 'ANTH',
    WORK = 'WORK',
    FAML = 'FAML',
    HOME = 'HOME',
    EDUC = 'EDUC',
}

const TaskTypesI18n: EnumI18n<typeof TaskTypes> = {
    ANTH: 'Anything',
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
