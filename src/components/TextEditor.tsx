import React from 'react';
import TextWithTooltip from './TextWithTooltip';
import classNames from 'classnames';
import { Formik, Field, Form, FieldProps } from 'formik';
import { Typography } from '@material-ui/core';
import { useI18n } from './I18nContext';

const defaultI18n = {
    required: 'Required',
};

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

    const i18n = useI18n(defaultI18n, 'TextEditor');
    const [isEditing, setIsEditing] = React.useState(false);

    React.useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, [isEditing]);

    return (
        <Formik
            initialValues={{ text: initialText }}
            onSubmit={(value) => onChange(value.text)}
            validate={(values) =>
                values.text === '' ? { text: i18n.required } : {}
            }
        >
            {({ values, errors, touched }) => (
                <React.Fragment>
                    <Form>
                        <Field name="text">
                            {({ field }: FieldProps) => (
                                <React.Fragment>
                                    <input
                                        {...field}
                                        ref={inputRef}
                                        onBlur={(e) => {
                                            if (!errors.text) {
                                                field.onBlur(e);
                                                setIsEditing(false);
                                            }
                                        }}
                                        className={classNames(
                                            className,
                                            {
                                                hide: !isEditing,
                                            },
                                            { error: !!errors.text && touched }
                                        )}
                                    />
                                    {values.text === '' && (
                                        <Typography color="error">
                                            {i18n.required}!
                                        </Typography>
                                    )}
                                </React.Fragment>
                            )}
                        </Field>
                    </Form>

                    <span
                        onDoubleClick={() => setIsEditing(true)}
                        className={isEditing ? 'hide' : undefined}
                    >
                        <TextWithTooltip
                            text={values.text}
                            maxTextWidth={maxTextWidth}
                        />
                    </span>
                </React.Fragment>
            )}
        </Formik>
    );
};

export default TextEditor;
