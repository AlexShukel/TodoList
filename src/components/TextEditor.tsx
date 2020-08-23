import React from 'react';
import TextWithTooltip from './TextWithTooltip';
import classNames from 'classnames';
import { Formik, Field, Form, FieldProps } from 'formik';

interface Props {
    initialText: string;
    maxTextWidth: number;
    onChange: (text: string) => void;

    className?: string;
}

// const ValidationSchema = Yup.object()

const TextEditor = ({
    initialText,
    onChange,
    className,
    maxTextWidth,
}: Props) => {
    const inputRef = React.useRef<HTMLInputElement>();

    const [isEditing, setIsEditing] = React.useState(false);

    React.useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, [isEditing]);

    return (
        <Formik
            initialValues={{ text: initialText }}
            onSubmit={(value) => onChange(value.text)}
            // validate={validationSchema}
        >
            {({ values }) => (
                <React.Fragment>
                    <Form>
                        <Field name="text">
                            {({ field, meta }: FieldProps) => (
                                <input
                                    {...field}
                                    {...meta}
                                    ref={inputRef}
                                    onBlur={(e) => {
                                        field.onBlur(e);
                                        setIsEditing(false);
                                    }}
                                    className={classNames(className, {
                                        hide: !isEditing,
                                    })}
                                />
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
