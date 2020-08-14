import React from 'react';
import { DateTimePicker, DateTimePickerProps } from '@material-ui/pickers';
import { Field, FieldProps } from 'formik';

interface Props extends Omit<DateTimePickerProps, 'value' | 'onChange'> {
    name: string;
}

const DateField = ({ name, ...other }: Props) => (
    <Field name={name}>
        {({ field, form }: FieldProps) => (
            <div>
                <DateTimePicker
                    {...field}
                    {...other}
                    onChange={(date) => form.setFieldValue(field.name, date)}
                    inputVariant="outlined"
                    margin="dense"
                />
            </div>
        )}
    </Field>
);

export default DateField;
