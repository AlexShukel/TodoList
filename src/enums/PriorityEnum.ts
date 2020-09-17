import { EnumBundle } from '.';

export enum Priorities {
    LOW = 'LOW',
    MED = 'MED',
    IMP = 'IMP',
}

const PrioritiesI18n = {
    LOW: 'Low',
    MED: 'Medium',
    IMP: 'Important',
};

export const PriorityEnumBundle: EnumBundle<typeof Priorities> = {
    values: Priorities,
    defaultI18n: PrioritiesI18n,
    name: 'Priorities',
};
