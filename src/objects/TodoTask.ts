import { Priorities } from '../enums/PriorityEnum';

export interface TodoTask {
    id: number;
    completed: boolean;
    description: string;
    priority: Priorities;
    targetDate: Date | null;
}
