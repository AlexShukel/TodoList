import React from 'react';
import { TodoArrayHelper } from './TodoContext/TodoArrayHelper';
import { Formik, Form, Field, FieldProps } from 'formik';
import { getUniqueId } from '../utils/IdUtils';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import { TextField, Button } from '@material-ui/core';
import styles from './NewGroupForm.scss';
import DateField from './DateField';

export default class NewGroupForm extends React.Component {
    public render() {
        return (
            <TodoArrayHelper arrayPath={`groups`}>
                {(controller) => (
                    <Formik
                        initialValues={{
                            title: '',
                            id: 0,
                            tasks: [],
                            targetDate: new Date(),
                        }}
                        onSubmit={(values, actions) => {
                            values.id = getUniqueId(controller.array, 'id');
                            values.targetDate = new Date(values.targetDate);
                            controller.add(values);

                            actions.resetForm();
                        }}
                    >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Form className={styles['form']}>
                                <Field name="title">
                                    {({ field }: FieldProps) => (
                                        <TextField
                                            {...field}
                                            variant="outlined"
                                            margin="dense"
                                        />
                                    )}
                                </Field>

                                <DateField name="targerDate" />

                                <Button type="submit">Add group</Button>
                            </Form>
                        </MuiPickersUtilsProvider>
                    </Formik>
                )}
            </TodoArrayHelper>
        );
    }
}
