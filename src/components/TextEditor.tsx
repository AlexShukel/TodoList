import React from 'react';
import TextWithTooltip from './TextWithTooltip';
import classNames from 'classnames';

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
    const [text, setText] = React.useState(initialText);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value);
        onChange(text);
    };

    React.useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, [isEditing]);

    return (
        <React.Fragment>
            <input
                ref={inputRef}
                value={text}
                onChange={handleChange}
                onBlur={() => setIsEditing(false)}
                className={classNames(
                    { className: true },
                    { hide: !isEditing }
                )}
            />
            <span
                onDoubleClick={() => setIsEditing(true)}
                className={isEditing ? 'hide' : undefined}
            >
                <TextWithTooltip text={text} maxTextWidth={maxTextWidth} />
            </span>
        </React.Fragment>
    );
};

export default TextEditor;
