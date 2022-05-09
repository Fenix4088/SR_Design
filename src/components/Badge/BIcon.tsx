import React from "react";
import styles from "./Badge.module.scss";

interface BIconProps {
    children: JSX.Element
}

export const BIcon = React.memo(({children: child, ...props}: BIconProps) => {
    return (
        <span className={styles['icon']}>
            {child}
        </span>
    )
})

BIcon.displayName = 'Badge Icon'