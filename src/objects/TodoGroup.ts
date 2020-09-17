import { Priorities } from '../enums/PriorityEnum';
import { TaskTypes } from '../enums/TaskTypes';
import { TodoTask } from './TodoTask';

export interface TodoGroup {
    id: number;
    title: string;
    tasks: TodoTask[];
    targetDate: Date;
    priority: Priorities;
    type: TaskTypes;
}
