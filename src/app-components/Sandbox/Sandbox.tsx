// @ts-nocheck
import React from 'react';
import { Typography, Link, Avatar, AvatarGroup, Badge } from '../../library-components';
import {BellIcon, RandomIcon} from "../../library-components/Icons";


const testUrl =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSFcT0Yq1YuK-VL5ccFmjUcNov2TcTClJT4m_b3k5DD42JuZmsaFPU8PqhRUpNSHf8vRo&usqp=CAU';
const testUrl2 = 'https://i.pinimg.com/736x/b6/0f/05/b60f05425a8191b70f3dea5a0ba893c7.jpg';
const testUrl3 = 'https://www.meme-arsenal.com/memes/100773de10bd652a2366e129c5053a0a.jpg';




export const Sandbox = () => {
  const [state, setState] = React.useState<boolean>(false);
  const [src, setSrc] = React.useState<string>('');

  const onMouseInHandler = () => console.log('onMouseInHandler');

  const onAddClb = (params: string) => console.log(params);


  return (
    <>
      <div className={'sandbox'}>
        <h2>Typography</h2>
        <Typography>
          <h1>H1</h1>
        </Typography>
        <Typography fontWeight={'semiBold'}>
          <h2>H2</h2>
        </Typography>
        <Typography>
          <h3>H3</h3>
        </Typography>
        <Typography>
          <h4>H4</h4>
        </Typography>
        <Typography textType={'body-1'} fontWeight={'regular'}>
          <div style={{ background: 'red' }}>div</div>
        </Typography>
        <Typography textType={'body-2'} fontWeight={'semiBold'}>
          <span style={{ cursor: 'pointer' }} onClick={() => setState(!state)}>
            span
          </span>
        </Typography>
        <Typography textType={'body-3'} fontWeight={'medium'}>
          <a href={'#'} onMouseOver={onMouseInHandler}>
            link
          </a>
        </Typography>
        <h2>Links</h2>
        <Typography fontWeight={'bold'} textType={'body-1'}>
          <span>
            Some text with{' '}
            <Link>
              <a href="#">very long link</a>
            </Link>
          </span>
        </Typography>
        <h2>Badges</h2>
        <Badge>
          <Badge.Value value={333} />
        </Badge>
        <Badge badgeType={'notification'}>
          <Badge.Icon>
            <RandomIcon />
          </Badge.Icon>
        </Badge>
        <Badge>
          <Badge.Icon>
            <BellIcon />
          </Badge.Icon>
          <Badge.Value value={333} />
        </Badge>
        <Badge badgeType={'notification'}>
          <Badge.Value value={14233} />
          <Badge.Icon>
            <BellIcon />
          </Badge.Icon>
        </Badge>
        <h2>Avatar</h2>
        <Avatar
          src={src || testUrl}
          isOnline
          userName={'Billy Milligan'}
          type={'avatar'}
          size={'huge'}
          color={'birthday'}
          onAdd={({ event, files, base64Arr }) => {
            console.log({ event, files, base64Arr });
            setSrc(base64Arr[0] as string);
          }}
          onRemove={() => {
            setSrc('');
          }}
        />
        <Avatar src={''} userName={'Anton Milifanov'} type={'avatar'} size={'middle'} color={'introvert'} />
        <Avatar src={testUrl3} userName={'Dima Makeev'} type={'avatar'} size={'tiny'} color={'extrovert'} />
        <Avatar
          src={''}
          type={'logo'}
          onAdd={onAddClb}
          onRemove={() => {}}
        />
        <Avatar
          src={testUrl2}
          type={'logo'}
          onAdd={(params) => {
            console.log(params);
          }}
          onRemove={() => {}}
        />

        <h2>Avatars group</h2>

        <AvatarGroup size={'tiny'}>
          {(avatarParams) => (
            <>
              <Avatar {...avatarParams} src={testUrl} userName={'Anton Milifanov'} color={'introvert'} />
              <Avatar {...avatarParams} src={''} userName={'Sam'} color={'extrovert'} />
              <Avatar {...avatarParams} src={testUrl2} userName={'Bill'} color={'birthday'} />
              <Avatar {...avatarParams} src={''} userName={'Robert'} color={'new-year'} />
              <Avatar {...avatarParams} src={testUrl3} userName={'Clara'} color={'introvert'} />
              <Avatar {...avatarParams} src={testUrl3} userName={'Clara'} color={'introvert'} />
              <Avatar {...avatarParams} src={testUrl3} userName={'Clara'} color={'introvert'} />
              <Avatar {...avatarParams} src={testUrl3} userName={'Clara'} color={'introvert'} />
              <Avatar {...avatarParams} src={testUrl3} userName={'Clara'} color={'introvert'} />
              <Avatar {...avatarParams} src={testUrl3} userName={'Clara'} color={'introvert'} />
            </>
          )}
        </AvatarGroup>

        <AvatarGroup size={'super-small'}>
          {(avatarParams) => (
            <>
              <Avatar {...avatarParams} src={testUrl} userName={'Anton Milifanov'} color={'introvert'} />
              <Avatar {...avatarParams} src={''} userName={'Sam'} color={'extrovert'} />
              <Avatar {...avatarParams} src={testUrl2} userName={'Bill'} color={'birthday'} />
              <Avatar {...avatarParams} src={''} userName={'Robert'} color={'new-year'} />
              <Avatar {...avatarParams} src={testUrl3} userName={'Clara'} color={'introvert'} />
              <Avatar {...avatarParams} src={testUrl3} userName={'Clara'} color={'introvert'} />
              <Avatar {...avatarParams} src={testUrl3} userName={'Clara'} color={'introvert'} />
              <Avatar {...avatarParams} src={testUrl3} userName={'Clara'} color={'introvert'} />
              <Avatar {...avatarParams} src={testUrl3} userName={'Clara'} color={'introvert'} />
            </>
          )}
        </AvatarGroup>

        <AvatarGroup size={'small'}>
          {(avatarParams) => (
            <>
              <Avatar {...avatarParams} src={testUrl} userName={'Anton Milifanov'} color={'introvert'} />
              <Avatar {...avatarParams} src={''} userName={'Sam'} color={'extrovert'} />
            </>
          )}
        </AvatarGroup>
      </div>
    </>
  );
};
