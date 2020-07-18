import { storiesOf } from '@storybook/react';
import React from 'react';
import { LoginDialog } from './Login';
import {ResponseType} from "../../../../../service/AuthenticationService";

storiesOf('Login Dialog', module).add('Default', () => {
  const login = async () => {
    return {status: 401, message: ''};
  };
  const setModalOpen = (open: boolean) => {};
  return (
    <LoginDialog setModalOpen={setModalOpen} modalOpen={true} onLogin={login} />
  );
});
