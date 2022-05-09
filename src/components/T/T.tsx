import React from "react";
import styles from './T.module.scss';
import classNames from "classnames";

type TStyles = {
    [K in string]: string;
}

interface TProps {
    children: JSX.Element
}

interface Headers extends TProps {
    fontWeight?: 'bold' | 'semiBold'
}

interface SimpleText extends TProps {
    textType: 'body-1' | 'body-2' | 'body-3' | 'captions' | 'overline'
    fontWeight: 'regular' | 'medium' | 'bold' | 'semiBold'
}

interface TOverload {
    (props: SimpleText): JSX.Element;

    (props: Headers): JSX.Element;
}

const componentStyles: TStyles = {
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
    overline: styles['overline']
}

export const getElementType = (elementType: string, textType: 'body-1' | 'body-2' | 'body-3' | 'captions' | 'overline'): string => {
    switch (elementType) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6': {
            return elementType
        }
        default: {
            return textType
        }
    }

}

export const T: TOverload = ({fontWeight = 'bold', textType, children: child}: any) => {
    if (typeof child.type !== 'string') {
        return <>{child}</>
    }

    if(child.type.match(/^h\d$/i) && textType) {
        throw new Error(`You could not use h1-h6 tags with 'textType: ${textType}' property`)
    }

    if(!child.type.match(/^h\d$/i) && !textType) {
        console.warn(`Child: ${child.type} in Typography component is useless without 'textType' property`)
    }

    const {className, ...restProps} = child.props;

    return React.cloneElement(child, {
        className: classNames(`${componentStyles[getElementType(child.type, textType)]} ${styles[fontWeight]}`, className),
        ...restProps
    })

}
