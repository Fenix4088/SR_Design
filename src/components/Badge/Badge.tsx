import React from 'react';
import styles from './Badge.module.scss'
import classNames from "classnames";
import {BValue} from "./BValue";
import {BIcon} from "./BIcon";

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


Badge.Icon = BIcon
Badge.Value = BValue