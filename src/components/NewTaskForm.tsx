import React from 'react';
import { TextField, IconButton, Icon } from '@material-ui/core';
import styles from './NewTaskForm.scss';
import { Formik, Form, Field, FieldProps } from 'formik';
import { TodoArrayHelper } from './TodoContext/TodoArrayHelper';
import { getUniqueId } from '../utils/IdUtils';
import {
    PriorityEnum,
    defaultI18n as priorityI18n,
} from '../enums/PriorityEnum';
import EnumField from './EnumField';
import DateField from './DateField';
import Label from './Label';
import EnableAbleContainer from './EnableAbleContainer';
import { useI18n } from './I18nContext';

const defaultI18n = {
    description: 'Description',
    priority: 'Priority',
    targetDate: 'Target date',
    priorityEnum: priorityI18n,
};
interface Props {
    groupIndex: number;
}

const NewTaskForm = ({ groupIndex }: Props) => {
    const i18n = useI18n(defaultI18n, 'NewTaskForm');

    return (
        <TodoArrayHelper arrayPath={`groups.${groupIndex}.tasks`}>
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
                            if (!dateEnabled) values.targetDate = null;
                            controller.add(values);
                            actions.resetForm();
                        }}
                    >
                        <Form className={styles['form-style']}>
                            <Label label={i18n.description} labelWidth={5}>
                                <Field name="description">
                                    {({ field }: FieldProps) => (
                                        <TextField
                                            {...field}
                                            variant="outlined"
                                            margin="dense"
                                            style={{
                                                width: 250,
                                            }}
                                        />
                                    )}
                                </Field>
                            </Label>
                            <Label label={i18n.priority} labelWidth={5}>
                                <EnumField
                                    name="type"
                                    values={PriorityEnum}
                                    i18n={i18n.priorityEnum}
                                    style={{ width: 150 }}
                                />
                            </Label>

                            <EnableAbleContainer
                                label={i18n.targetDate}
                                labelWidth={5}
                            >
                                {(enabled) => {
                                    dateEnabled = enabled;
                                    return (
                                        <DateField
                                            name="targetDate"
                                            style={{ width: 250 }}
                                        />
                                    );
                                }}
                            </EnableAbleContainer>

                            <IconButton type="submit">
                                <Icon style={{ color: 'green' }}>add</Icon>
                            </IconButton>
                        </Form>
                    </Formik>
                );
            }}
        </TodoArrayHelper>
    );
};

export default NewTaskForm;
