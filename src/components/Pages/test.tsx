import React from 'react';
import useResizeObserver from 'use-resize-observer';
import { Formik, Field, Form, FieldProps } from 'formik';

interface Props {
    initialText: string;
}

const Test = ({ initialText }: Props) => {
    console.log('RENDER');
    const textRef = React.useRef<HTMLSpanElement>();

    const [edit, setEdit] = React.useState(false);
    const [text, setText] = React.useState(initialText);

    const onResize = React.useCallback(
        ({ width }) => {
            console.log(width);
        },
        [text]
    );

    const { width } = useResizeObserver({
        ref: textRef,
        onResize,
    });

    return edit ? (
        <Formik
            initialValues={{ text }}
            onSubmit={(value) => setText(value.text)}
        >
            {({ submitForm }) => (
                <Form>
                    <Field name="text">
                        {({ field }: FieldProps) => (
                            <input
                                {...field}
                                onBlur={(e) => {
                                    setEdit(false);
                                    submitForm();
                                    field.onBlur(e);
                                }}
                            />
                        )}
                    </Field>
                </Form>
            )}
        </Formik>
    ) : (
        <span
            ref={textRef}
            onDoubleClick={() => setEdit(true)}
            style={{ opacity: edit ? 0 : 1 }}
        >
            {text}
        </span>
    );
};

export default Test;
