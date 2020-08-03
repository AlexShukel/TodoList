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
import EnableAbleContainer from './EnableAbleContainer';

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
                    let dateEnabled = false;
                    return (
                        <Formik
                            initialValues={{
                                id: 0,
                                completed: false,
                                description: '',
                                type: PriorityEnum.LOW,
                                targetDate: null,
                            }}
                            onSubmit={(values, actions) => {
                                values.id = getUniqueId(controller.array, 'id');
                                if (dateEnabled) values.targetDate = null;
                                controller.add(values);
                                actions.resetForm();
                            }}
                        >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Form className={styles['form-style']}>
                                    <Label label="Description" labelWidth={5}>
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
                                    <Label label="Priority" labelWidth={5}>
                                        <EnumField
                                            name="type"
                                            values={PriorityEnum}
                                            i18n={defaultI18n}
                                            style={{ width: 150 }}
                                        />
                                    </Label>

                                    <EnableAbleContainer
                                        label="Target date"
                                        labelWidth={5}
                                    >
                                        {(enabled) => {
                                            dateEnabled = enabled;
                                            return (
                                                <DateField
                                                    name="targetDate"
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                    }}
                                                />
                                            );
                                        }}
                                    </EnableAbleContainer>

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
