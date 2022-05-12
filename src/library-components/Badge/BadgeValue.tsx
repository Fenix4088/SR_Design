import React from 'react';
import styles from './Badge.module.scss';
import classNames from 'classnames';

const numFormatter = (num: number): string => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + 'K';
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }

  return '' + num;
};

interface BadgeValueProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  value: number;
}

export const BadgeValue = React.memo(({ value, className }: BadgeValueProps) => {
  const formatValue = React.useMemo(() => {
    return numFormatter(value);
  }, [value]);

  const elementCN = classNames(styles['value'], className);

  return <span className={elementCN}>{formatValue}</span>;
});

BadgeValue.displayName = 'Badge Value';
