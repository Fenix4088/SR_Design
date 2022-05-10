import React from 'react';
import classNames from "classnames";
import styles from './Avatar.module.scss'

type Size = 'huge' | 'large' | 'middle' | 'small' | 'supersmall' | 'tiny';

interface AvatarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    size?: Size
}

export const Avatar = ({size = 'huge', className, ...props}: AvatarProps) => {
    const avatarCN = classNames(styles['avatar'], styles[`${size}`], className);

    return (
        <div {...props} className={avatarCN}>
            <div className={styles['name']}>H</div>
        </div>
    )
}