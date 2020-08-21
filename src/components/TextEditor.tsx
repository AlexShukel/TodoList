import React from 'react';
import TextWithTooltip from './TextWithTooltip';

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

    return isEditing ? (
        <input
            ref={inputRef}
            value={text}
            onChange={handleChange}
            onBlur={() => setIsEditing(false)}
            className={className}
        />
    ) : (
        <span onDoubleClick={() => setIsEditing(true)}>
            <TextWithTooltip text={text} maxTextWidth={maxTextWidth} />
        </span>
    );
};

export default TextEditor;
