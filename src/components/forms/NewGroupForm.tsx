import React from 'react';
import { TodoArrayHelper } from '../TodoContext/TodoArrayHelper';
import { Formik, Form, Field, FieldProps } from 'formik';
import { getUniqueId } from '../../utils/IdUtils';

import { TextField } from '@material-ui/core';
import DateField from '../DateField';
import Label from '../Label';
import { useI18n } from '../I18nContext';
import SwitchableContainer from '../EnableAbleContainer';
import ButtonsContainer from '../ButtonsContainer';
import EnumField from '../EnumField';
import { Priorities, PriorityEnumBundle } from '../../enums/PriorityEnum';
import { TaskTypes, TaskTypesBundle } from '../../enums/TaskTypes';

const defaultI18n = {
    title: 'Title',
    targetDate: 'TargetDate',
    required: 'Required',
    priority: 'Priority',
    type: 'Type',
};

let dateEnabled = false;

interface Props {
    closePopup: () => void;
}

const NewGroupForm = ({ closePopup }: Props) => {
    const i18n = useI18n(defaultI18n, 'NewGroupForm');
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    return (
        <TodoArrayHelper arrayPath={`groups`}>
            {(controller) => (
                <Formik
                    initialValues={{
                        title: '',
                        id: 0,
                        tasks: [],
                        targetDate: null,
                        priority: Priorities.LOW,
                        type: TaskTypes.NONE,
                    }}
                    onSubmit={(values, actions) => {
                        values.id = getUniqueId(controller.array, 'id');
                        if (!dateEnabled) values.targetDate = null;
                        controller.add(values);
                        closePopup();
                        actions.resetForm();
                    }}
                    validate={(values) => {
                        if (values.title === '')
                            return { title: i18n.required };
                        return null;
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className="form">
                            <Label label={i18n.title} labelWidth={5} required>
                                <Field name="title">
                                    {({ field }: FieldProps) => (
                                        <TextField
                                            {...field}
                                            inputRef={inputRef}
                                            variant="outlined"
                                            margin="dense"
                                            className="form__field"
                                            error={
                                                errors.title && touched.title
                                            }
                                            label={
                                                errors.title &&
                                                touched.title &&
                                                errors.title
                                            }
                                        />
                                    )}
                                </Field>
                            </Label>

                            <Label label={i18n.priority} labelWidth={5}>
                                <EnumField
                                    name="priority"
                                    enumBundle={PriorityEnumBundle}
                                    style={{ width: 150 }}
                                />
                            </Label>

                            <Label label={i18n.type} labelWidth={5}>
                                <EnumField
                                    name="type"
                                    enumBundle={TaskTypesBundle}
                                    style={{ width: 150 }}
                                />
                            </Label>

                            <SwitchableContainer
                                label={i18n.targetDate}
                                labelWidth={5}
                            >
                                {(enabled) => {
                                    dateEnabled = enabled;
                                    return (
                                        <DateField
                                            name="targerDate"
                                            className="form__field"
                                        />
                                    );
                                }}
                            </SwitchableContainer>

                            <ButtonsContainer
                                errors={!!errors.title}
                                closeForm={closePopup}
                            />
                        </Form>
                    )}
                </Formik>
            )}
        </TodoArrayHelper>
    );
};

export default NewGroupForm;
