import React from "react";
import styles from "./Badge.module.scss";
import classNames from "classnames";

const numFormatter = (num: number): string => {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K';
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }

    return '' + num
}

interface BValueProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
    textContent: number;
}

export const BValue = React.memo(({textContent, className}: BValueProps) => {
    const formatTextContent = React.useMemo(() => {
        return numFormatter(textContent)
    }, [textContent])

    const elementCN = classNames(styles['value'], className)

    return (
        <span className={elementCN}>
            {formatTextContent}
        </span>
    )
})

BValue.displayName = 'Badge Value'