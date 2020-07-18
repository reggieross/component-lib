import { storiesOf } from '@storybook/react';
import React from 'react';
import { StandardPage } from './StandardPage';
import { CookieMonster, CookieType } from '../../utils';
import { UserInfo } from './Navigation/Account/Account';
import {AuthenticationService, ResponseType} from '../../service/AuthenticationService';

storiesOf('Standard Page', module).add('Default', () => {
  const userInfo: UserInfo = {};

  AuthenticationService.login = async (username: string, password: string) => {
    return ResponseType.SUCCESS;
  };

  return (
    <StandardPage pageId={'some-page'}>
      <div style={{ height: '1000px' }}>Testing</div>
    </StandardPage>
  );
});
