import React from "react";
import styles from "./Badge.module.scss";
import classNames from "classnames";

interface BIconProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>{
    children: JSX.Element
}

export const BIcon = React.memo(({children: child, className, ...props}: BIconProps) => {
    const elementCN = classNames(styles['icon'], className)

    return (
        <span {...props} className={elementCN}>
            {child}
        </span>
    )
})

BIcon.displayName = 'Badge Icon'