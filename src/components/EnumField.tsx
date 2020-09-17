import React, { ChangeEvent, CSSProperties } from 'react';
import { Field, FieldProps } from 'formik';
import { Select, MenuItem } from '@material-ui/core';
import { EnumBundle, RenderEnum } from '../enums';

interface Props<T> {
    name: string;
    shownone?: string;
    onChange?: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
    style?: CSSProperties;
    enumBundle: EnumBundle<T>;
}

export default function EnumField<T extends Record<string, string>>({
    onChange,
    shownone,
    name,
    enumBundle,
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
                    {Object.keys(enumBundle.values).map((value) => (
                        <MenuItem value={value} key={value}>
                            <RenderEnum value={value} enumBundle={enumBundle} />
                        </MenuItem>
                    ))}
                </Select>
            )}
        </Field>
    );
}
