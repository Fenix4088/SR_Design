import React, { ReactElement } from 'react';
import { AvatarName } from '../Avatar';
import { warning } from '../../../utils/helpers';
import styles from './AvatarGroup.module.scss';

interface AvatarGroupReturnParams {
  type: 'avatar';
  size: 'small' | 'super-small' | 'tiny';
}

interface AvatarGroupProps extends Omit<AvatarGroupReturnParams, 'type'> {
  children: (avatarParams: AvatarGroupReturnParams) => ReactElement;
}

export const AvatarGroup = ({ size, children }: AvatarGroupProps) => {
  const avatars = children({ type: 'avatar', size });

  if (avatars.props.children.some((avatar: JSX.Element) => avatar.type.displayName !== AvatarName)) {
    warning('AvatarGroup should contain just Avatar components');
    return null;
  }

  let zIndex = avatars.props.children.length;

  const testAvatar = avatars.props.children.map((avatar: JSX.Element) => {
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
  return <div className={styles['avatar-group-wrapper']}>{testAvatar}</div>;
};
