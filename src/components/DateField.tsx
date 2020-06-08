import React from 'react';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import { Field, FieldProps } from 'formik';

interface Props {
    name: string;
    onBlur?: (e: React.FocusEvent) => void;
}

const DateField = (props: Props) => (
    <Field name={props.name}>
        {({ field, form }: FieldProps) => (
            <React.Fragment>
                <KeyboardDatePicker
                    {...field}
                    onChange={(date) => form.setFieldValue(field.name, date)}
                    variant="inline"
                    format="MM/dd/yyyy"
                    onBlur={(e) => {
                        field.onBlur(e);
                        props.onBlur(e);
                    }}
                    PopoverProps={{ disablePortal: true }}
                />
                <KeyboardTimePicker
                    {...field}
                    onChange={(date) => form.setFieldValue(field.name, date)}
                    onBlur={(e) => {
                        field.onBlur(e);
                        props.onBlur(e);
                    }}
                    variant="inline"
                    PopoverProps={{ disablePortal: true }}
                />
            </React.Fragment>
        )}
    </Field>
);

export default DateField;
