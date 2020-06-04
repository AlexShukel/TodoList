import { TodoTask } from './TodoTask';

export interface TodoGroup {
    id: number;
    title: string;
    tasks: TodoTask[];
    targetDate: Date;
}
