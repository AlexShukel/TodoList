import React from 'react';
import { TextField, IconButton, Icon } from '@material-ui/core';
import styles from './NewTaskForm.scss';
import { Formik, Form, Field, FieldProps } from 'formik';
import { TodoArrayHelper } from './TodoContext/TodoArrayHelper';
import { getUniqueId } from '../utils/IdUtils';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
    PriorityEnum,
    defaultI18n as priorityI18n,
} from '../enums/PriorityEnum';
import EnumField from './EnumField';
import DateField from './DateField';
import Label from './Label';
import EnableAbleContainer from './EnableAbleContainer';
import { withI18n } from './i18n/I18n';

const defaultI18n = {
    description: 'Description',
    priority: 'Priority',
    targetDate: 'Target date',
    priorityEnum: priorityI18n,
};
type I18n = typeof defaultI18n;
interface Props {
    groupIndex: number;
    i18n: I18n;
}

class _NewTaskForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    public render() {
        const { groupIndex: index, i18n } = this.props;
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
                                if (!dateEnabled) values.targetDate = null;
                                controller.add(values);
                                actions.resetForm();
                            }}
                        >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Form className={styles['form-style']}>
                                    <Label
                                        label={i18n.description}
                                        labelWidth={5}
                                    >
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
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                    }}
                                                />
                                            );
                                        }}
                                    </EnableAbleContainer>

                                    <IconButton type="submit">
                                        <Icon style={{ color: 'green' }}>
                                            add
                                        </Icon>
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

const NewTaskForm = withI18n(_NewTaskForm, defaultI18n, 'NewTaskForm');
export default NewTaskForm;
