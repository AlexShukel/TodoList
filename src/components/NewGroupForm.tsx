import React from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import { Button, TextField } from '@material-ui/core';
import {
    TodoArrayHelper,
    ArrayController,
} from './TodoContext/TodoArrayHelper';
import { TodoGroup } from '../objects/TodoGroup';
import { getUniqueId } from '../utils/IdUtils';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

class NewGroupForm extends React.Component {
    public render() {
        return (
            <TodoArrayHelper arrayPath={`groups`}>
                {(controller: ArrayController<TodoGroup>) => {
                    return (
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
                                <Form>
                                    <Field name="title">
                                        {({ field }: FieldProps) => (
                                            <TextField {...field} />
                                        )}
                                    </Field>

                                    <Field name="targetDate">
                                        {({ field }: FieldProps) => (
                                            <TextField
                                                {...field}
                                                type="datetime-local"
                                            />
                                        )}
                                    </Field>

                                    <Button type="submit">Add group</Button>
                                </Form>
                            </MuiPickersUtilsProvider>
                        </Formik>
                    );
                }}
            </TodoArrayHelper>
        );
    }
}

export default NewGroupForm;
