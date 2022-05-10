import React  from 'react';
import styles from './Badge.module.scss'
import classNames from "classnames";
import {BValue} from "./BValue";
import {BIcon} from "./BIcon";


/**
 * @desc Badge component should be used with BadgeIcon and BadgeValue
 * @link [compound components pattern](https://blog.logrocket.com/understanding-react-compound-components/)
 */

interface BadgeProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: JSX.Element | JSX.Element[]
    badgeType?: 'basic' | 'notification'
}

const BadgeBase = React.memo(({children, badgeType = 'basic', className, ...props}: BadgeProps) => {
    const badgeCN = classNames(styles['badge'], styles[badgeType], className)
    return (
        <button {...props} className={badgeCN}>{children}</button>
    )
})

type TBadge = typeof BadgeBase & {
    Icon: typeof BIcon,
    Value: typeof BValue
}

export const Badge = BadgeBase as TBadge


Badge.Icon = BIcon
Badge.Value = BValue

