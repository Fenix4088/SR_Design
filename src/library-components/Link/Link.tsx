import React from 'react';
import styles from './Link.module.scss';
import classNames from 'classnames';

interface LinkProps {
  children: JSX.Element;
}

export const Link = ({ children: child }: LinkProps) => {
  if (child.type !== 'a') {
    throw new Error(`Link component should have a link tag type as a child`);
  }

  const { className, ...restProps } = child.props;

  return React.cloneElement(child, {
        className: classNames(className, styles['link']),
        ...restProps,
      }
  );
};
