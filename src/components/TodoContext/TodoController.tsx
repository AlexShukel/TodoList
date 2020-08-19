import React from 'react';
import { AppData } from '../../objects/AppData';
import TodoContext from './TodoContext';
import * as fs from 'fs';
import { toDates } from 'ts-transformer-dates';
import { Language } from '../../enums/Language';

const filePath = 'data.json';

export class TodoController extends React.Component<{}, AppData> {
    constructor(props: {}) {
        super(props);
        this.state = this.loadData();
    }
    private setValues = (values: AppData) => {
        this.setState(values, this.saveData);
    };
    private loadData = () => {
        if (fs.existsSync(filePath)) {
            return toDates<AppData>(
                JSON.parse(fs.readFileSync(filePath).toString())
            );
        } else {
            const emptyData: AppData = {
                groups: [],
                language: Language.EN,
            };
            fs.writeFileSync(filePath, JSON.stringify(emptyData));
            return emptyData;
        }
    };
    private saveData = () => {
        fs.writeFileSync(filePath, JSON.stringify(this.state));
    };
    public render() {
        return (
            <TodoContext.Provider
                value={{ ...this.state, setValues: this.setValues }}
            >
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}
