import React from 'react';
import { Tooltip } from '@material-ui/core';

interface Props {
    text: string;
    maxTextWidth: number;
}

const OverflowText = ({ text, maxTextWidth }: Props) => {
    const hiddenTextRef = React.useRef<HTMLDivElement>();
    const textRef = React.useRef<HTMLDivElement>();

    const [showTooltip, setShowTooltip] = React.useState<boolean>(null);

    React.useEffect(() => {
        if (hiddenTextRef.current && textRef.current) {
            if (
                hiddenTextRef.current.offsetWidth >=
                textRef.current.offsetWidth - 5
            )
                setShowTooltip(true);
            else setShowTooltip(false);
        }
    }, [text]);

    return (
        <Tooltip
            title={<span className="multiline">{text}</span>}
            placement="bottom-start"
            disableHoverListener={!showTooltip}
        >
            <div>
                <div
                    ref={hiddenTextRef}
                    style={{ maxWidth: maxTextWidth }}
                    className="hide"
                >
                    {text}
                </div>
                <div
                    ref={textRef}
                    className="text-ellipsis"
                    style={{ width: maxTextWidth }}
                >
                    {text}
                </div>
            </div>
        </Tooltip>
    );
};

export default OverflowText;
