import { TodoGroup } from './TodoGroup';
import { Language } from '../enums/Language';

export interface AppData {
    groups: TodoGroup[];
    language: Language;
}
