import React, { ChangeEvent } from 'react';
import { Field, FieldProps } from 'formik';
import { Select, MenuItem } from '@material-ui/core';

interface Props<T> {
    values: T;
    name: string;
    i18n: any;
    showNone?: boolean;
    onChange?: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
}

export default class EnumField<T> extends React.Component<Props<T>> {
    public render() {
        const { name, values, i18n, showNone, onChange } = this.props;

        return (
            <Field name={name}>
                {({ field }: FieldProps) => (
                    <Select
                        {...field}
                        onChange={(e) => {
                            field.onChange(e);
                            onChange && onChange(e);
                        }}
                        variant="outlined"
                        margin="dense"
                    >
                        {showNone && <MenuItem value="">None</MenuItem>}
                        {Object.keys(values).map((value) => (
                            <MenuItem value={value} key={value}>
                                {i18n[value]}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            </Field>
        );
    }
}
