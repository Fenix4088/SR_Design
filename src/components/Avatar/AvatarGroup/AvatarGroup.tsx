import React, { ReactElement } from 'react';
import { AvatarName } from '../Avatar';
import { warning } from '../../../utils/helpers';
import styles from './AvatarGroup.module.scss';
import classNames from 'classnames';
import { compose } from '../../../utils/utils';

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

export const spliceAvatarsToIndex = (avatars: [JSX.Element[], number]): JSX.Element[] => {
  if (avatars[0].length <= avatars[1]) return avatars[0];
  return avatars[0].slice(0, avatars[1]);
};

export const applyZIndex = (avatars: JSX.Element[]): JSX.Element[] => {
  let zIndex = avatars.length;
  return avatars.map((avatar) => {
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
};

export const useFormatAvatarGroupChildren = (
  avatars: JSX.Element[],
  maxDisplayedLength = 4
): UseFormatAvatarGroupChildrenReturnType => {
  const restCount = avatars.length - maxDisplayedLength;

  const formatedAvatars = compose<[typeof spliceAvatarsToIndex, typeof applyZIndex], [JSX.Element[], number]>(
    spliceAvatarsToIndex,
    applyZIndex
  )(avatars, maxDisplayedLength);

  return {
    restCount,
    avatars: formatedAvatars,
  };
};

export const isSomeChildIsNotAvatar = (avatars: JSX.Element[]): boolean =>
  avatars.some((avatar: JSX.Element) => avatar.type.displayName !== AvatarName);

export const AvatarGroup = ({ size, children, maxDisplayedLength = 4 }: AvatarGroupProps) => {
  const avatarCountCN = classNames(styles['avatar-count'], styles[size]);

  const avatars = children({ type: 'avatar', size });
  const avatarGroupChildren: JSX.Element[] = avatars.props.children;

  const isCounterVisible = maxDisplayedLength < avatarGroupChildren.length;

  if (isSomeChildIsNotAvatar(avatarGroupChildren)) {
    warning('AvatarGroup should contain just Avatar components');
    return null;
  }

  //! Note: Guaranteed that hook will work correctly in spite of the condition above
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { avatars: formatAvatars, restCount } = useFormatAvatarGroupChildren(avatarGroupChildren, maxDisplayedLength);

  return (
    <div className={styles['avatar-group-wrapper']}>
      {formatAvatars}
      {isCounterVisible && <div className={avatarCountCN}>+{restCount}</div>}
    </div>
  );
};
