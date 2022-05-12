import React from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { type = 'button', className, disabled, children } = props;

  return (
    <button type={type} disabled={disabled} className={cn(styles['button'], className)} ref={ref}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
