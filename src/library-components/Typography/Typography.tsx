import React from 'react';
import styles from './Typography.module.scss';
import classNames from 'classnames';
import { PickFromType } from '../../types/generics';
import { warning } from '../../utils/helpers';

type TypographyStyles = {
  [K in string]: string;
};

type TextType = 'body-1' | 'body-2' | 'body-3' | 'captions' | 'overline';
type FontWeight = 'regular' | 'medium' | 'bold' | 'semi-bold';

interface TypographyProps {
  children: JSX.Element;
}

export interface Headers extends TypographyProps {
  fontWeight?: PickFromType<FontWeight, 'bold' | 'semi-bold'>;
}

export interface SimpleText extends TypographyProps {
  textType: TextType;
  fontWeight: FontWeight;
}

export interface Overload {
  (props: SimpleText): JSX.Element;

  (props: Headers): JSX.Element;

  displayName?: string;
}

const componentStyles: TypographyStyles = {
  h1: styles['h1'],
  h2: styles['h2'],
  h3: styles['h3'],
  h4: styles['h4'],
  h5: styles['h5'],
  h6: styles['h6'],
  'body-1': styles['body-1'],
  'body-2': styles['body-2'],
  'body-3': styles['body-3'],
  captions: styles['captions'],
  overline: styles['overline'],
};

export const getElementType = (elementType: string, textType: TextType): string => {
  switch (elementType) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6': {
      return elementType;
    }
    default: {
      return textType;
    }
  }
};

export const Typography: Overload = ({ fontWeight = 'bold', textType, children: child }: any) => {
  if (typeof child.type !== 'string') {
    return <>{child}</>;
  }

  if (child.type.match(/^h\d$/i) && textType) {
    throw new Error(`You could not use h1-h6 tags with 'textType: ${textType}' property`);
  }

  if (!child.type.match(/^h\d$/i) && !textType) {
    warning(`'Child: ${child.type}' in Typography component is useless without 'textType' property`);
  }

  const { className, ...restProps } = child.props;

  return React.cloneElement(child, {
    className: classNames(`${componentStyles[getElementType(child.type, textType)]} ${styles[fontWeight]}`, className),
    ...restProps,
  });
};

Typography.displayName = 'Typography';
