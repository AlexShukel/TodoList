import React, { CSSProperties } from 'react';
import {
    KeyboardDatePicker,
    KeyboardTimePicker,
    DateTimePicker,
} from '@material-ui/pickers';
import { Field, FieldProps } from 'formik';

interface Props {
    name: string;
    style?: CSSProperties;
}

const DateField = (props: Props) => (
    <Field name={props.name}>
        {({ field, form }: FieldProps) => (
            <div style={props.style}>
                {/* <KeyboardDatePicker
                    {...field}
                    onChange={(date) => form.setFieldValue(field.name, date)}
                    variant="inline"
                    format="MM/dd/yyyy"
                    onBlur={(e) => {
                        field.onBlur(e);
                        props.onBlur(e);
                    }}
                    PopoverProps={{ disablePortal: true }}
                    autoOk
                    disablePast
                    style={{
                        width: 150,
                    }}
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
                    autoOk
                    style={{
                        width: 150,
                    }}
                /> */}
                <DateTimePicker
                    {...field}
                    onChange={(date) => form.setFieldValue(field.name, date)}
                    inputVariant="outlined"
                    margin="dense"
                    style={{
                        width: 250,
                    }}
                />
            </div>
        )}
    </Field>
);

export default DateField;
