import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Field, Form, FieldProps, FormikProvider, useFormik } from 'formik';
import OverflowText from './OverflowText';

interface Props {
    initialText: string;
    maxTextWidth: number;
    onChange: (text: string) => void;

    className?: string;
}

const TextEditor = ({
    initialText,
    onChange,
    className,
    maxTextWidth,
}: Props) => {
    const inputRef = React.useRef<HTMLInputElement>();

    const [isEditing, setIsEditing] = React.useState(false);

    const formik = useFormik({
        initialValues: { text: initialText },
        onSubmit: (value) =>
            value.text !== ''
                ? onChange(value.text.trim())
                : onChange(initialText.trim()),
    });

    const { submitForm, setFieldValue } = formik;

    const setValue = useCallback(
        (value: string) => {
            if (value === '') setFieldValue('text', initialText);
            submitForm();
            setIsEditing(false);
        },
        [setFieldValue, submitForm, initialText]
    );

    React.useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, [isEditing]);

    return (
        <FormikProvider value={formik}>
            <Form>
                <Field name="text">
                    {({ field }: FieldProps) => (
                        <React.Fragment>
                            <input
                                {...field}
                                ref={inputRef}
                                onBlur={(e) => {
                                    field.onBlur(e);
                                    setValue(e.target.value);
                                }}
                                className={classNames(className, {
                                    hide: !isEditing,
                                })}
                                style={{
                                    maxWidth: maxTextWidth,
                                    height: 'auto',
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        setValue(e.currentTarget.value);
                                    }
                                }}
                            />
                        </React.Fragment>
                    )}
                </Field>
            </Form>

            <span
                onDoubleClick={() => setIsEditing(true)}
                className={isEditing ? 'hide' : undefined}
            >
                <OverflowText text={initialText} maxTextWidth={maxTextWidth} />
            </span>
        </FormikProvider>
    );
};

export default TextEditor;
