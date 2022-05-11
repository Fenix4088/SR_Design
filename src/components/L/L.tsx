import React from 'react';
import styles from './L.module.scss';
import classNames from 'classnames';

interface LProps {
  children: JSX.Element;
}

export const L = ({ children: child }: LProps) => {
  if (child.type !== 'a') {
    throw new Error(`L component should have a link tag type as a child`);
  }

  const { className, ...restProps } = child.props;

  return (
    <>
      {React.cloneElement(child, {
        className: classNames(className, styles['link']),
        ...restProps,
      })}
    </>
  );
};
