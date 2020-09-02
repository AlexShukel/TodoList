import React from 'react';
import classNames from 'classnames';
import { Formik, Field, Form, FieldProps } from 'formik';
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

    React.useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, [isEditing]);

    return (
        <Formik
            initialValues={{ text: initialText }}
            onSubmit={(value) =>
                Boolean(value.text)
                    ? onChange(value.text)
                    : onChange(initialText)
            }
        >
            {({ values }) => (
                <React.Fragment>
                    <Form>
                        <Field name="text">
                            {({ field }: FieldProps) => (
                                <React.Fragment>
                                    <input
                                        {...field}
                                        ref={inputRef}
                                        onBlur={(e) => {
                                            field.onBlur(e);
                                            setIsEditing(false);
                                        }}
                                        className={classNames(className, {
                                            hide: !isEditing,
                                        })}
                                        style={{
                                            maxWidth: maxTextWidth,
                                            height: 'auto',
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
                        <OverflowText
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
