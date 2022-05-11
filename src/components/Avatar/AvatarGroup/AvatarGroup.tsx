import React, { ReactElement } from 'react';
import { AvatarName } from '../Avatar';
import { warning } from '../../../utils/helpers';
import styles from './AvatarGroup.module.scss';
import classNames from 'classnames';

interface AvatarGroupReturnParams {
  type: 'avatar';
  size: 'small' | 'super-small' | 'tiny';
}

interface AvatarGroupProps extends Omit<AvatarGroupReturnParams, 'type'> {
  maxDisplayedLength?: number;
  children: (avatarParams: AvatarGroupReturnParams) => ReactElement;
}

interface UseFormatAvatarGroupChildrenReturnType {
  avatars: JSX.Element[];
  restCount: number;
}

export const useFormatAvatarGroupChildren = (
  avatars: JSX.Element[],
  maxDisplayedLength = 4
): UseFormatAvatarGroupChildrenReturnType => {
  const restCount = avatars.length - maxDisplayedLength;

  const testAvatar = avatars.slice(0, maxDisplayedLength);

  let zIndex = avatars.length;
  const testAvatar2 = testAvatar.map((avatar) => {
    --zIndex;
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

  return {
    restCount,
    avatars: testAvatar2,
  };
};

export const isSomeChildIsNotAvatar = (avatars: JSX.Element[]): boolean =>
  avatars.some((avatar: JSX.Element) => avatar.type.displayName === AvatarName);

export const AvatarGroup = ({ size, children, maxDisplayedLength = 4 }: AvatarGroupProps) => {
  const avatarCountCN = classNames(styles['avatar-count'], styles[size]);

  const avatars = children({ type: 'avatar', size });
  const avatarGroupChildren: JSX.Element[] = avatars.props.children;


  if (!isSomeChildIsNotAvatar(avatarGroupChildren)) {
    warning('AvatarGroup should contain just Avatar components');
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { avatars: formatAvatars, restCount } = useFormatAvatarGroupChildren(avatarGroupChildren, maxDisplayedLength);


  return (
    <div className={styles['avatar-group-wrapper']}>
      {formatAvatars}
      <div className={avatarCountCN}>+{restCount}</div>
    </div>
  );
};
