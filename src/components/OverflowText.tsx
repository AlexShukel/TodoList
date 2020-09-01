import React from 'react';
import { Tooltip, withStyles } from '@material-ui/core';

interface Props {
    text: string;
    maxTextWidth: number;
}

const TooltipPopper = withStyles({
    tooltip: {
        fontSize: 18,
    },
})(Tooltip);

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
        <TooltipPopper
            title={text}
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
        </TooltipPopper>
    );
};

export default OverflowText;
