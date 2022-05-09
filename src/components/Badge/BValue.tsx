import React from "react";
import styles from "./Badge.module.scss";

const numFormatter = (num: number): string => {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K';
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }

    return '' + num
}

interface BValueProps {
    textContent: `${number}`;
}

export const BValue = React.memo(({textContent}: BValueProps) => {
    const formatTextContent = React.useMemo(() => {
        if (isNaN(+textContent)) return textContent;

        const int = parseInt(textContent, 10);

        return numFormatter(int)
    }, [textContent])

    return (
        <span className={styles['value']}>
            {formatTextContent}
        </span>
    )
})

BValue.displayName = 'Badge Value'