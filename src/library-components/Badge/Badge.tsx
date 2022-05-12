import React from 'react';
import styles from './Badge.module.scss';
import classNames from 'classnames';
import { BadgeValue } from './BadgeValue';
import { BadgeIcon } from './BadgeIcon';

/**
 * @desc Badge component should be used with BadgeIcon and BadgeValue
 * @link [compound components pattern](https://blog.logrocket.com/understanding-react-compound-components/)
 */

interface BadgeProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: JSX.Element | JSX.Element[];
  badgeType?: 'basic' | 'notification';
}

export const Badge = ({ children, badgeType = 'basic', className, ...props }: BadgeProps) => {
  const badgeCN = classNames(styles['badge'], styles[badgeType], className);
  return (
    <button {...props} className={badgeCN}>
      {children}
    </button>
  );
};

Badge.displayName = 'Badge';

Badge.Icon = BadgeIcon;
Badge.Value = BadgeValue;


