import { EnumBundle, EnumI18n } from '.';

export const priorityValues = {
    LOW: 0,
    MED: 1,
    IMP: 2,
};

export enum Priorities {
    LOW = 'LOW',
    MED = 'MED',
    IMP = 'IMP',
}

const PrioritiesI18n: EnumI18n<typeof Priorities> = {
    LOW: 'Low',
    MED: 'Medium',
    IMP: 'Important',
};

export const PriorityEnumBundle: EnumBundle<typeof Priorities> = {
    values: Priorities,
    defaultI18n: PrioritiesI18n,
    name: 'Priorities',
};
