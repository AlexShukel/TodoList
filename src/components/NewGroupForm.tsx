import React from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import { Button, TextField } from '@material-ui/core';
import { TodoArrayHelper, ArrayController } from './TodoContext';
import { TodoGroup } from '../objects/TodoGroup';
import { getUniqueId } from '../utils/IdUtils';

class NewGroupForm extends React.Component {
    public render() {
        return (
            <TodoArrayHelper arrayPath={`groups`}>
                {(controller: ArrayController<TodoGroup>) => {
                    return (
                        <Formik
                            initialValues={{ title: '', id: 5, tasks: [] }}
                            onSubmit={(values, actions) => {
                                values.id = getUniqueId(controller.array, 'id');
                                controller.add(values);
                                actions.resetForm();
                            }}
                        >
                            <Form>
                                <Field name="title">
                                    {({ field }: FieldProps) => (
                                        <TextField {...field} />
                                    )}
                                </Field>
                                <Button type="submit">Add group</Button>
                            </Form>
                        </Formik>
                    );
                }}
            </TodoArrayHelper>
        );
    }
}

export default NewGroupForm;
