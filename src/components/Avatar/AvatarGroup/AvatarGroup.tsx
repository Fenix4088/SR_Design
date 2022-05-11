import React, { ReactElement } from 'react';
import { AvatarName } from '../Avatar';
import { warning } from '../../../utils/helpers';
import styles from './AvatarGroup.module.scss';
import classNames from "classnames";

interface AvatarGroupReturnParams {
  type: 'avatar';
  size: 'small' | 'super-small' | 'tiny';
}

interface AvatarGroupProps extends Omit<AvatarGroupReturnParams, 'type'> {
  maxDisplayedLength?: number
  children: (avatarParams: AvatarGroupReturnParams) => ReactElement;
}

export const AvatarGroup = ({ size, children, maxDisplayedLength = 4 }: AvatarGroupProps) => {

  const avatarCountCN = classNames(styles['avatar-count'], styles[size])

  const avatars = children({ type: 'avatar', size });
  const avatarGroupChildren: JSX.Element[] = avatars.props.children;

  //TODO: func
  if (avatarGroupChildren.some((avatar: JSX.Element) => avatar.type.displayName !== AvatarName)) {
    warning('AvatarGroup should contain just Avatar components');
    return null;
  }

  const testAvatar = avatarGroupChildren.slice(0, maxDisplayedLength)
  const restCount = avatarGroupChildren.length - maxDisplayedLength;

  //TODO: function
  let zIndex = avatarGroupChildren.length;
  const testAvatar2 = testAvatar.map((avatar: JSX.Element) => {
    --zIndex
    return {
      ...avatar,
      props: {
        ...avatar.props,
        wrapperStyles: {
          zIndex: zIndex,
        },
      },
    };
  });

  console.log(avatars.props.children.length);
  console.log(avatars.props.children);
  return <div className={styles['avatar-group-wrapper']}>{testAvatar2} <div className={avatarCountCN}>+{restCount}</div></div>;
};
