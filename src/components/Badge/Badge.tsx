import React from 'react';
import styles from './Badge.module.scss'
import classNames from "classnames";

interface BadgeProps {
    children: JSX.Element | JSX.Element[]
    isDisabled?: false
    type?: 'basic' | 'notification'
}

export const Badge = ({children, type = 'basic', isDisabled}: BadgeProps) => {
    const badgeCN = classNames(styles['badge'], styles[`${type}`])
    return (
        <button className={badgeCN} disabled={isDisabled}>{children}</button>
    )
}


interface BIconProps {
    children: JSX.Element
}

export const BIcon = ({children: child, ...props}: BIconProps) => {
    return (
        <span className={styles['icon']}>
            {child}
        </span>
    )
}

interface BValueProps {
    textContent: `${number}`;
}

export const BValue = ({textContent}: BValueProps) => {
    return (
        <span className={styles['value']}>
            {textContent}
        </span>
    )
}

Badge.Icon = BIcon
Badge.Value = BValue