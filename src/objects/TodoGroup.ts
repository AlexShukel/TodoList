import { PriorityEnum } from '../enums/PriorityEnum';
import { TodoTask } from './TodoTask';

export interface TodoGroup {
    id: number;
    title: string;
    tasks: TodoTask[];
    targetDate: Date;
    priority: PriorityEnum;
}
