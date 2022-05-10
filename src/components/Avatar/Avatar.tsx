import React from 'react';
import classNames from "classnames";
import styles from './Avatar.module.scss'

type Size = 'huge' | 'large' | 'middle' | 'small' | 'super-small' | 'tiny';
type Color = 'new-year' | 'birthday' | 'extrovert' | 'introvert';


interface AvatarBase extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'color'> {
    size: Size
}

interface IAvatar extends AvatarBase {
    type: 'avatar'
    color: Color
    userName: string;
}

interface Logo extends AvatarBase {
    type: 'logo'
}

type Overload = {
    (props: IAvatar): JSX.Element;
    (props: Logo): JSX.Element;
}

export const Avatar: Overload = ({size, color, type, className, userName, ...props}: any) => {

    const avatarCN = classNames(styles['avatar'], styles[size], styles[color], className);
    const logoCN = classNames(styles['avatar'], styles['logo'],  styles[size], className);

    const isLogoType = type === 'logo' && true;
    const currentCN = isLogoType ? logoCN : avatarCN;
    const userNameFirstLetter = userName ? userName.trim().charAt(0).toUpperCase() : null;
    const userNameNodeContent = isLogoType ? 'Add logo' : userNameFirstLetter

    return (
        <div {...props} className={currentCN}>
            <div className={styles['name']}>{userNameNodeContent}</div>
        </div>
    )
}