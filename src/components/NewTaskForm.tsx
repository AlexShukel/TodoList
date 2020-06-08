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
    KeyboardTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { PriorityEnum, defaultI18n } from '../enums/PriorityEnum';
import EnumField from './EnumField';
import DatePicker from './DateField';
import DateField from './DateField';

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
                                    <Field
                                        name="description"
                                        validate={(value: string) => {
                                            if (value.trim().length === 0)
                                                return 'Required';
                                            return null;
                                        }}
                                    >
                                        {({
                                            field,
                                            meta: { touched, error },
                                        }: FieldProps) => (
                                            <TextField
                                                {...field}
                                                variant="outlined"
                                                error={
                                                    Boolean(error) && touched
                                                }
                                                helperText={touched && error}
                                                margin="dense"
                                            />
                                        )}
                                    </Field>
                                    <EnumField
                                        name="type"
                                        values={PriorityEnum}
                                        i18n={defaultI18n}
                                    />
                                    <DateField name="targetDate" />

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
