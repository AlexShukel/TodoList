import React from 'react';
import { Formik, Field, FieldProps, Form } from 'formik';
import styles from './TextEditor.scss';

interface Props {
    text: string;
    className?: string;
    enableEllipsis?: boolean;

    onChange: (text: string) => void;
}

interface State {
    isEditing: boolean;
}

export default class TextEditor extends React.Component<Props, State> {
    private inputRef = React.createRef<HTMLInputElement>();
    constructor(props: Props) {
        super(props);
        this.state = { isEditing: false };
    }
    private beginEditing = () => {
        this.setState({ isEditing: true }, () => {
            if (this.inputRef.current) this.inputRef.current.focus();
        });
    };
    public render() {
        const {
            text,
            onChange,
            children,
            className,
            enableEllipsis,
        } = this.props;
        const { isEditing } = this.state;

        return (
            <Formik
                initialValues={{ text }}
                onSubmit={(values) => {
                    onChange(values.text);
                    this.setState({ isEditing: false });
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
                                    ref={this.inputRef}
                                    onBlur={(e) => {
                                        onChange(e.target.value);
                                        this.setState({ isEditing: false });
                                        field.onBlur(e);
                                    }}
                                />
                            )}
                        </Field>
                    </Form>
                ) : (
                    <div
                        onDoubleClick={this.beginEditing}
                        className={
                            enableEllipsis
                                ? styles['description-ellipsis']
                                : undefined
                        }
                    >
                        {children}
                    </div>
                )}
            </Formik>
        );
    }
}
