import React from 'react';
import '../../app/App.scss';
import { T } from '../T/T';
import { L } from '../L/L';
import { Badge } from '../Badge/Badge';
import { ReactComponent as BellIcon } from '../../icons/bell.svg';
import { ReactComponent as RandomIcon } from '../../icons/random.svg';
import { Avatar } from '../Avatar/Avatar';
import { log } from 'util';

export const Sandbox = () => {
  const [state, setState] = React.useState<boolean>(false);
  const [files, setFiles] = React.useState<File[]>([]);

  // const ref = React.useRef<any>(null);

  const onMouseInHandler = () => console.log('onMouseInHandler');

  const onCHangeHandler = (e: any): void => {
    console.log(e.currentTarget.value);
  };

  return (
    <>
      <div className={'sandbox'}>
        <h2>Typography</h2>
        <T>
          <h1>H1</h1>
        </T>
        <T fontWeight={'semiBold'}>
          <h2>H2</h2>
        </T>
        <T>
          <h3>H3</h3>
        </T>
        <T>
          <h4>H4</h4>
        </T>
        <T textType={'body-1'} fontWeight={'regular'}>
          <div style={{ background: 'red' }}>div</div>
        </T>
        <T textType={'body-2'} fontWeight={'semiBold'}>
          <span style={{ cursor: 'pointer' }} onClick={() => setState(!state)}>
            span
          </span>
        </T>
        <T textType={'body-3'} fontWeight={'medium'}>
          <a href={'#'} onMouseOver={onMouseInHandler}>
            link
          </a>
        </T>
        <h2>Links</h2>
        <T fontWeight={'bold'} textType={'body-1'}>
          <span>
            Some text with{' '}
            <L>
              <a href="#">very long link</a>
            </L>
          </span>
        </T>
        <h2>Badges</h2>
        <Badge>
          <Badge.Value textContent={333} />
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
          <Badge.Value textContent={333} />
        </Badge>

        <Badge badgeType={'notification'}>
          <Badge.Value textContent={14233} />
          <Badge.Icon>
            <BellIcon />
          </Badge.Icon>
        </Badge>
        <h2>Avatar</h2>

        <Avatar
          src={''}
          isOnline
          userName={'Billy Milligan'}
          type={'avatar'}
          size={'huge'}
          color={'birthday'}
          onAdd={(e, files) => {
            setFiles(files);
          }}
          onRemove={() => {
            setFiles([]);
          }}
        />

        <Avatar src={''} userName={'Anton Milifanov'} type={'avatar'} size={'middle'} color={'introvert'} />

        <Avatar src={''} userName={'Dima Makeev'} type={'avatar'} size={'tiny'} color={'extrovert'} />

        <Avatar
          src={''}
          type={'logo'}
          onAdd={(e, files) => {
            setFiles(files);
          }}
          onRemove={() => {
            setFiles([]);
          }}
        />
      </div>
    </>
  );
};
