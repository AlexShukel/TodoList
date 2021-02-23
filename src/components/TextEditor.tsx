import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Field, Form, FieldProps, FormikProvider, useFormik } from 'formik';
import OverflowText from './OverflowText';

interface Props {
    initialText: string;
    maxTextWidth: number;
    onChange: (text: string) => void;

    multiline?: boolean;
    className?: string;
}

const TextEditor = ({
    initialText,
    onChange,
    className,
    maxTextWidth,
    multiline,
}: Props) => {
    const inputRef = React.useRef<HTMLInputElement>();
    const textAreaRef = React.useRef<HTMLTextAreaElement>();

    const [isEditing, setIsEditing] = React.useState(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { text: initialText },
        onSubmit: (value) =>
            value.text !== '' ? onChange(value.text) : onChange(initialText),
    });

    const { submitForm, setFieldValue } = formik;

    const setValue = useCallback(
        (value: string) => {
            if (value.trim() === '') setFieldValue('text', initialText);
            else setFieldValue('text', value.trim());
            submitForm();
            setIsEditing(false);
        },
        [setFieldValue, submitForm, initialText]
    );

    React.useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
        if (textAreaRef.current) textAreaRef.current.focus();
    }, [isEditing]);

    return (
        <FormikProvider value={formik}>
            <Form>
                <Field name="text">
                    {({ field }: FieldProps) =>
                        multiline ? (
                            <textarea
                                {...field}
                                ref={textAreaRef}
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
                                    resize: 'none',
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        setValue(e.currentTarget.value);
                                    }
                                }}
                            />
                        ) : (
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
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        setValue(e.currentTarget.value);
                                    }
                                }}
                            />
                        )
                    }
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
