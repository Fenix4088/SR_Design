import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { CameraIcon, TrashIcon } from '../Icons';
import styles from './Avatar.module.scss';
import {convertToBase64, filterByMIME, MIMECheckerAPI} from "../../utils/utils";

export type Size = 'huge' | 'large' | 'middle' | 'small' | 'super-small' | 'tiny';
export type Color = 'new-year' | 'birthday' | 'extrovert' | 'introvert';

type FileInputProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'value' | 'onChange' | 'type' | 'multiple' | 'accept'
  >

export interface OnAddParams {
  event: React.MouseEvent<HTMLSpanElement, MouseEvent>;
  files: File[]
  base64Arr: (string | ArrayBuffer)[]
}

type AvatarBase = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'color'> & {
  src: string;
  wrapperClassName?: string;
  wrapperStyles?: CSSProperties;
};

type AvatarControls = {
  value?: File[];
  onAdd: (params: OnAddParams) => void;
  onRemove: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  fileInputHtmlProps?: FileInputProps;
};

type AvatarProps = AvatarBase & {
  type: 'avatar';
  color: Color;
  userName: string;
  size: Size;
};

type HugeAvatarProps = Omit<AvatarProps, 'size'> &
  AvatarControls & {
    size: 'huge';
    isOnline?: boolean;
  };

type LogoProps = AvatarBase &
  AvatarControls & {
    type: 'logo';
  };

type Overload = {
  (props: HugeAvatarProps): JSX.Element;
  (props: AvatarProps): JSX.Element;
  (props: LogoProps): JSX.Element;
  displayName?: string
  componentName: 'Avatar'
};

export const Avatar: Overload = ({
  size,
  src,
  isOnline = false,
  color,
  type,
  className,
  userName,
  onAdd,
  onRemove,
  value,
  fileInputHtmlProps = {},
  wrapperClassName,
  wrapperStyles,
  ...props
}: any) => {

  const defaultFileInputProps: FileInputProps = {
    accept: 'image/png, image/jpeg',
    multiple: false,
    ...fileInputHtmlProps
  }

  const avatarCN = classNames(styles['avatar'], styles[size], styles[color], className);
  const logoCN = classNames(styles['avatar'], styles['logo'], styles['huge'], className);
  const wrapperCN = classNames(styles['wrapper'], wrapperClassName);

  const isLogoType = type === 'logo';
  const currentCN = isLogoType ? logoCN : avatarCN;
  const userNameFirstLetter = userName ? userName.trim().charAt(0).toUpperCase() : null;
  const userNameNodeContent = isLogoType ? 'Add logo' : userNameFirstLetter;
  const isControlPanelVisible = isLogoType || size === 'huge';

  const onAddHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = event.currentTarget;
    if(!files) return;

    const checkedFiles = filterByMIME(files, MIMECheckerAPI.checkImageMIMEType)
    const base64Arr = await convertToBase64(checkedFiles)

    onAdd?.({event, files: checkedFiles, base64Arr});
  };
  const onRemoveHandler = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
    onRemove?.(e);
  };

  const avatarContent = src ? (
    <img className={styles['image']} src={src} alt="Avatar" />
  ) : (
    <div className={styles['name']}>{userNameNodeContent}</div>
  );

  const controlPanel = isControlPanelVisible ? (
    <div className={styles['control-panel']}>
      <div className={styles['control-btn-wrapper']}>
        <label className={styles['add-btn']}>
          <input {...defaultFileInputProps} value={value} type="file" onChange={onAddHandler} />
          <CameraIcon />
        </label>
        {src && (
          <span className={styles['remove-btn']} onClick={onRemoveHandler}>
            <TrashIcon />
          </span>
        )}
      </div>
    </div>
  ) : null;

  return (
    <div className={wrapperCN} style={wrapperStyles}>
      <div {...props} className={currentCN}>
        {controlPanel}
        {avatarContent}
      </div>
      {isOnline && <div className={styles['online-indicator']} />}
    </div>
  );
};

Avatar.displayName = 'Avatar';
Avatar.componentName = 'Avatar';

export const AvatarName = Avatar.componentName;
