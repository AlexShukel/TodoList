import React, { ChangeEvent, CSSProperties } from 'react';
import { Field, FieldProps } from 'formik';
import { Select, MenuItem } from '@material-ui/core';

interface Props<T> {
    values: T;
    name: string;
    i18n: any;
    shownone?: string;
    onChange?: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
    style?: CSSProperties;
}

export default function EnumField<T>({
    onChange,
    shownone,
    values,
    i18n,
    name,
    style,
}: Props<T>) {
    const [open, setOpen] = React.useState(false);
    return (
        <Field name={name}>
            {({ field }: FieldProps) => (
                <Select
                    {...field}
                    open={open}
                    onClick={() => setOpen((prev) => !prev)}
                    style={style}
                    onChange={(e) => {
                        field.onChange(e);
                        onChange && onChange(e);
                    }}
                    variant="outlined"
                    margin="dense"
                >
                    {shownone && <MenuItem value="">None</MenuItem>}
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
