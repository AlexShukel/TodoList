import React, { useCallback } from 'react';
import { Formik, Field, FieldProps, Form } from 'formik';
import styles from './TextEditor.scss';
import { Tooltip } from '@material-ui/core';

interface Props {
    text: string;
    onChange: (text: string) => void;

    children?: React.ReactNode;
    className?: string;
    enableEllipsis?: boolean;
}

interface State {
    isEditing: boolean;
    textWidth: number;
}

const TextEditor = ({
    text,
    onChange,
    className,
    enableEllipsis,
    children,
}: Props) => {
    const inputRef = React.useRef<HTMLInputElement>();

    const [isEditing, setIsEditing] = React.useState(false);
    const [textWidth, setTextWidth] = React.useState(0);
    console.log(textWidth);

    const measuredRef = useCallback((node) => {
        if (node !== null) {
            setTextWidth(node.getBoundingClientRect().height);
        }
    }, []);

    const beginEditing = () => {
        setIsEditing(true);
        if (inputRef.current) inputRef.current.focus();
    };

    return (
        <Formik
            initialValues={{ text }}
            onSubmit={(values) => {
                onChange(values.text);
                setIsEditing(false);
            }}
            enableReinitialize
        >
            {isEditing ? (
                <Form>
                    <Field name="text">
                        {({ field }: FieldProps) => (
                            <input
                                className={className}
                                {...field}
                                ref={inputRef}
                                onBlur={(e) => {
                                    onChange(e.target.value);
                                    setIsEditing(false);
                                    field.onBlur(e);
                                }}
                            />
                        )}
                    </Field>
                </Form>
            ) : textWidth > 170 ? (
                <Tooltip title={children} placement="bottom-start">
                    <div
                        ref={measuredRef}
                        onDoubleClick={beginEditing}
                        className={
                            enableEllipsis
                                ? styles['description-ellipsis']
                                : undefined
                        }
                    >
                        {children || text}
                    </div>
                </Tooltip>
            ) : (
                <div
                    ref={measuredRef}
                    onDoubleClick={beginEditing}
                    className={
                        enableEllipsis
                            ? styles['description-ellipsis']
                            : undefined
                    }
                >
                    {children || text}
                </div>
            )}
        </Formik>
    );
};

export default TextEditor;
