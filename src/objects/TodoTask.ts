import { PriorityEnum } from '../enums/PriorityEnum';
import { TaskTypes } from '../enums/TaskTypes';

export interface TodoTask {
    id: number;
    completed: boolean;
    description: string;
    priority: PriorityEnum;
    targetDate: Date | null;
    type: TaskTypes;
}
