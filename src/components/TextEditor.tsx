import React, { useCallback } from 'react';
import { Formik, Field, FieldProps, Form } from 'formik';
import styles from './TextEditor.scss';
import { Tooltip } from '@material-ui/core';
import useResizeObserver from 'use-resize-observer';

interface Props {
    text: string;
    maxTextWidth: number;
    onChange: (text: string) => void;

    children?: React.ReactNode;
    className?: string;
    enableEllipsis?: boolean;
}

const TextEditor = ({
    text,
    onChange,
    className,
    enableEllipsis,
    children,
    maxTextWidth,
}: Props) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const textRef = React.useRef<HTMLDivElement>(null);

    const [isEditing, setIsEditing] = React.useState(false);
    const [showTooltip, setShowTooltip] = React.useState(false);

    const { width } = useResizeObserver({
        ref: textRef,
        onResize: ({ width }) => {
            width >= maxTextWidth
                ? setShowTooltip(true)
                : setShowTooltip(false);

            console.log(width);
        },
    });

    const beginEditing = useCallback(() => {
        setIsEditing(true);
        if (inputRef.current) inputRef.current.focus();
    }, [isEditing]);
    console.log(width);

    return isEditing ? (
        <Formik
            initialValues={{ text }}
            onSubmit={(values) => {
                onChange(values.text);
                setIsEditing(false);
            }}
            enableReinitialize
        >
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
        </Formik>
    ) : (
        <Tooltip
            title={children}
            placement="bottom-start"
            disableHoverListener={!showTooltip}
            disableFocusListener={!showTooltip}
            disableTouchListener={!showTooltip}
        >
            <div
                onDoubleClick={beginEditing}
                className={
                    enableEllipsis ? styles['description-ellipsis'] : undefined
                }
                style={{ maxWidth: maxTextWidth, width: 'auto' }}
                ref={textRef}
            >
                <span>
                    {children || text}
                    {Math.floor(width)}
                </span>
            </div>
        </Tooltip>
    );
};

export default TextEditor;
