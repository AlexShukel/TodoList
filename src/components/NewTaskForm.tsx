import React from 'react';
import { TextField, IconButton, Icon, Grid } from '@material-ui/core';
import styles from './NewTaskForm.scss';
import { Formik, Form, Field, FieldProps } from 'formik';
import { TodoArrayHelper } from './TodoContext/TodoArrayHelper';
import { getUniqueId } from '../utils/IdUtils';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { PriorityEnum, defaultI18n } from '../enums/PriorityEnum';
import EnumField from './EnumField';
import DateField from './DateField';
import Label from './Label';

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
                                    <Grid container spacing={2}>
                                        <Label label="Description" vertical>
                                            <Field name="description">
                                                {({ field }: FieldProps) => (
                                                    <TextField
                                                        {...field}
                                                        variant="outlined"
                                                        margin="dense"
                                                    />
                                                )}
                                            </Field>
                                        </Label>
                                        <Label label="Priority" vertical>
                                            <EnumField
                                                name="type"
                                                values={PriorityEnum}
                                                i18n={defaultI18n}
                                            />
                                        </Label>
                                        <Label
                                            label="Target date and time"
                                            vertical
                                            labelWidth={4}
                                        >
                                            <DateField name="targetDate" />
                                        </Label>
                                        <Grid
                                            item
                                            container
                                            alignItems="center"
                                            xs={2}
                                        >
                                            <IconButton type="submit">
                                                <Icon>add</Icon>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
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
