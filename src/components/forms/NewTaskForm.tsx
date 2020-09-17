import React from 'react';
import { TextField } from '@material-ui/core';
import { Formik, Form, Field, FieldProps } from 'formik';
import { TodoArrayHelper } from '../TodoContext/TodoArrayHelper';
import { getUniqueId } from '../../utils/IdUtils';
import { Priorities, PriorityEnumBundle } from '../../enums/PriorityEnum';
import EnumField from '../EnumField';
import DateField from '../DateField';
import Label from '../Label';
import SwitchableContainer from '../EnableAbleContainer';
import { useI18n } from '../I18nContext';
import ButtonsContainer from '../ButtonsContainer';
import { TaskTypes, TaskTypesBundle } from '../../enums/TaskTypes';

const defaultI18n = {
    description: 'Description',
    priority: 'Priority',
    targetDate: 'Target date',
    required: 'Required',
    type: 'Type',
};
interface Props {
    groupIndex: number;
    onSubmit: () => void;
}

let dateEnabled = false;

const NewTaskForm = ({ groupIndex, onSubmit }: Props) => {
    const i18n = useI18n(defaultI18n, 'NewTaskForm');
    const inputRef = React.useRef<HTMLInputElement>();

    React.useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    return (
        <TodoArrayHelper arrayPath={`groups.${groupIndex}.tasks`}>
            {(controller) => {
                return (
                    <Formik
                        initialValues={{
                            id: 0,
                            completed: false,
                            description: '',
                            priority: Priorities.LOW,
                            targetDate: null,
                            type: TaskTypes.NONE,
                        }}
                        onSubmit={(values, actions) => {
                            values.id = getUniqueId(controller.array, 'id');
                            if (!dateEnabled) values.targetDate = null;
                            controller.add(values);
                            actions.resetForm();
                            onSubmit();
                        }}
                        validate={(values) => {
                            if (values.description === '')
                                return { description: i18n.required };
                            return null;
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className={'form'}>
                                <Label label={i18n.description} labelWidth={5}>
                                    <Field name="description">
                                        {({ field }: FieldProps) => (
                                            <TextField
                                                {...field}
                                                inputRef={inputRef}
                                                error={
                                                    errors.description &&
                                                    touched.description
                                                }
                                                variant="outlined"
                                                margin="dense"
                                                className="form__field"
                                                label={
                                                    errors.description &&
                                                    touched.description &&
                                                    errors.description
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
                                                name="targetDate"
                                                className="form__field"
                                            />
                                        );
                                    }}
                                </SwitchableContainer>

                                <ButtonsContainer
                                    errors={!!errors.description}
                                    closeForm={onSubmit}
                                />
                            </Form>
                        )}
                    </Formik>
                );
            }}
        </TodoArrayHelper>
    );
};

export default NewTaskForm;
