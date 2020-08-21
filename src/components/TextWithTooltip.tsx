import React from 'react';

import styles from './TextWithTooltip.scss';
import { Tooltip } from '@material-ui/core';

interface Props {
    text: string;
    maxTextWidth: number;
}

const TextWithTooltip = ({ text, maxTextWidth }: Props) => {
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
        <React.Fragment>
            <div
                ref={hiddenTextRef}
                style={{ opacity: 0, position: 'absolute' }}
            >
                {text}
            </div>
            {showTooltip ? (
                <Tooltip title={text} placement="bottom-start">
                    <div
                        ref={textRef}
                        className={styles['description-ellipsis']}
                        style={{ width: maxTextWidth }}
                    >
                        {text}
                    </div>
                </Tooltip>
            ) : (
                <div
                    ref={textRef}
                    className={styles['description-ellipsis']}
                    style={{ width: maxTextWidth }}
                >
                    {text}
                </div>
            )}
        </React.Fragment>
    );
};

export default TextWithTooltip;
