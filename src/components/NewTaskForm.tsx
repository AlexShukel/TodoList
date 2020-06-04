import React from 'react';
import { TodoTask } from '../objects/TodoTask';
import {
    Button,
    TextField,
    IconButton,
    Icon,
    Select,
    MenuItem,
} from '@material-ui/core';
import styles from './NewTaskForm.scss';
import { Formik, Form, Field, FieldProps } from 'formik';
import { TodoArrayHelper } from './TodoContext/TodoArrayHelper';
import { getUniqueId } from '../utils/IdUtils';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { PriorityEnum, defaultI18n } from '../enums/PriorityEnum';
import EnumField from './EnumField';

interface Props {
    groupIndex: number;
}

class NewTaskForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    public render() {
        const { groupIndex: index } = this.props;
        return (
            <TodoArrayHelper arrayPath={`groups.${index}.tasks`}>
                {(controller) => {
                    return (
                        <Formik
                            initialValues={{
                                id: 0,
                                completed: false,
                                description: '',
                                type: PriorityEnum.LOW,
                                targetDate: new Date(),
                            }}
                            onSubmit={(values, actions) => {
                                values.id = getUniqueId(controller.array, 'id');

                                controller.add(values);
                                actions.resetForm();
                            }}
                        >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Form className={styles['form-style']}>
                                    <Field name="description">
                                        {({ field }: FieldProps) => (
                                            <TextField
                                                {...field}
                                                variant="outlined"
                                            />
                                        )}
                                    </Field>
                                    <EnumField
                                        name="type"
                                        values={PriorityEnum}
                                        i18n={defaultI18n}
                                    />

                                    <Field name="targetDate">
                                        {({ field }: FieldProps) => (
                                            <TextField
                                                {...field}
                                                type="datetime-local"
                                            />
                                        )}
                                    </Field>

                                    <IconButton type="submit">
                                        <Icon>add</Icon>
                                    </IconButton>
                                </Form>
                            </MuiPickersUtilsProvider>
                        </Formik>
                    );
                }}
            </TodoArrayHelper>
        );
    }
}

export default NewTaskForm;
