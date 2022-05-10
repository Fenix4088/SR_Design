import React from 'react';
import classNames from "classnames";
import {ReactComponent as CameraIcon} from '../../icons/camera.svg'
import {ReactComponent as TrashIcon} from '../../icons/trash.svg'
import styles from './Avatar.module.scss'

type Size = 'huge' | 'large' | 'middle' | 'small' | 'super-small' | 'tiny';
type Color = 'new-year' | 'birthday' | 'extrovert' | 'introvert';


interface AvatarBase extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'color'> {
    onAdd?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
    onRemove?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

interface IAvatar extends AvatarBase {
    type: 'avatar'
    color: Color
    userName: string;
    size: Size
}

interface Logo extends AvatarBase {
    type: 'logo'
}

type Overload = {
    (props: IAvatar): JSX.Element;
    (props: Logo): JSX.Element;
}

export const Avatar: Overload = ({size, color, type, className, userName, onAdd, onRemove, ...props}: any) => {

    const avatarCN = classNames(styles['avatar'], styles[size], styles[color], className);
    const logoCN = classNames(styles['avatar'], styles['logo'], styles['huge'], className);

    const isLogoType = type === 'logo' && true;
    const currentCN = isLogoType ? logoCN : avatarCN;
    const userNameFirstLetter = userName ? userName.trim().charAt(0).toUpperCase() : null;
    const userNameNodeContent = isLogoType ? 'Add logo' : userNameFirstLetter;
    const isControlPanelVisible = isLogoType || size === 'huge';

    const onAddHandler = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
        onAdd(e)
    }
    const onRemoveHandler = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
        onRemove(e)
    }

    //TODO: Maby should create a component for the control panel?
    const controlPanel = isControlPanelVisible ? <div className={styles['control-panel']}>
        <div className={styles['control-btn-wrapper']}>
            <span className={styles['add-btn']} onClick={onAddHandler}>
                <CameraIcon/>
            </span>
            <span className={styles['remove-btn']} onClick={onRemoveHandler}>
                <TrashIcon/>
            </span>
        </div>

    </div> : null;

    return (
        <div {...props} className={currentCN}>
            {controlPanel}
            <div className={styles['name']}>{userNameNodeContent}</div>
        </div>
    )
}