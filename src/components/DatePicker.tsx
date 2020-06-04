import React from 'react';
import { FieldProps, Field } from 'formik';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';

interface Props {
    value: Date;
    onChange: (date: Date) => void;
}

const DatePicker = (props: Props) => {
    return (
        <React.Fragment>
            <KeyboardDatePicker
                value={props.value}
                onChange={props.onChange}
                variant="inline"
                format="MM/dd/yyyy"
            />
            <KeyboardTimePicker value={props.value} onChange={props.onChange} />
        </React.Fragment>
    );
};

export default DatePicker;
