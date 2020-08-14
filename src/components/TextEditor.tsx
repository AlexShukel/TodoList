import React from 'react';
import { Formik, Field, FieldProps, Form } from 'formik';
import styles from './TextEditor.scss';
import { Popper, Paper } from '@material-ui/core';

interface Props {
    text: string;
    onChange: (text: string) => void;

    className?: string;
    enableEllipsis?: boolean;
}

interface State {
    isEditing: boolean;
    anchor: null | HTMLElement;
}

export default class TextEditor extends React.Component<Props, State> {
    private inputRef = React.createRef<HTMLInputElement>();
    constructor(props: Props) {
        super(props);
        this.state = { isEditing: false, anchor: null };
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
        const { isEditing, anchor } = this.state;

        const open = Boolean(anchor);

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
                                        this.setState({
                                            isEditing: false,
                                            anchor: null,
                                        });
                                        field.onBlur(e);
                                    }}
                                />
                            )}
                        </Field>
                    </Form>
                ) : (
                    <div>
                        <div
                            onDoubleClick={this.beginEditing}
                            className={
                                enableEllipsis
                                    ? styles['description-ellipsis']
                                    : undefined
                            }
                            onMouseOver={(e) =>
                                this.setState({ anchor: e.currentTarget })
                            }
                            onMouseLeave={() => this.setState({ anchor: null })}
                        >
                            {children}
                        </div>
                        <Popper open={open} anchorEl={anchor}>
                            <div className={styles.popper}>{children}</div>
                        </Popper>
                    </div>
                )}
            </Formik>
        );
    }
}
