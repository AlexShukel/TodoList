import { Priorities } from '../enums/PriorityEnum';
import { TaskTypes } from '../enums/TaskTypes';

export interface TodoTask {
    id: number;
    completed: boolean;
    description: string;
    priority: Priorities;
    targetDate: Date | null;
    type: TaskTypes;
}
