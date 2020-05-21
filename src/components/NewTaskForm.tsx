import React from 'react';
import { TodoTask } from '../objects/TodoTask';
import { Button, TextField } from '@material-ui/core';
import styles from './NewTaskForm.scss';
import { Formik, Form, Field, FieldProps } from 'formik';
import { TodoArrayHelper } from './TodoContext';
import { getUniqueId } from '../utils/IdUtils';

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
                                type: 'Low',
                            }}
                            onSubmit={(values, actions) => {
                                values.id = getUniqueId(controller.array, 'id');

                                controller.add(values);
                                actions.resetForm();
                            }}
                        >
                            <Form className={styles.formStyle}>
                                <Field name="description">
                                    {({ field }: FieldProps) => (
                                        <TextField {...field} />
                                    )}
                                </Field>
                                <Field as="select" name="type">
                                    <option value="Important">Important</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </Field>

                                <Button type="submit">Add task</Button>
                            </Form>
                        </Formik>
                    );
                }}
            </TodoArrayHelper>
        );
    }
}

export default NewTaskForm;
