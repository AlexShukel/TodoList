import { PriorityEnum } from '../enums/PriorityEnum';

export interface TodoTask {
    id: number;
    completed: boolean;
    description: string;
    priority: PriorityEnum;
    targetDate: Date | null;
}
