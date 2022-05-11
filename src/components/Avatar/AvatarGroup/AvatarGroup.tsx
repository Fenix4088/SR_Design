import React, {ReactElement, ReactNode} from 'react';

interface AvatarGroupReturnParams {
    type: 'avatar';
    size: 'small' | 'super-small' | 'tiny'
}

interface AvatarGroupProps extends AvatarGroupReturnParams{
    children: (avatarParams: AvatarGroupReturnParams) => ReactElement;
}

export const AvatarGroup = ({type, size, children}: AvatarGroupProps) => {
    const content = children({type, size})
    console.log(content.props)
    console.log(content.props.children[0].type.displayName)
    console.log(content.props.children.length)
    return (
        <div>
            {content}
        </div>
    )
}