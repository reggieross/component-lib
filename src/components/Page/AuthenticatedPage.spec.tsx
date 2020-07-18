import { mount } from 'enzyme';
import React from 'react';
import { AuthenticatedPage } from './AuthenticatedPage';
import { CookieMonster, CookieType } from '../../utils';
import { Navigation } from './Navigation/Navigation';
import { AuthenticationService } from '../../service/AuthenticationService';

describe('Authenticated Page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should mount component successfully', () => {
    const onUnauthenticated = jest.fn();
    const component = mount(
      <AuthenticatedPage
        onUnauthenticated={onUnauthenticated}
        pageId={'some-page'}
      >
        <div />
      </AuthenticatedPage>
    );

    expect(component.exists()).toBe(true);
  });

  it('Should call onAuthenticated when auth fails', (done) => {
    const onUnauthenticated = jest.fn();
    const auth = async () => {
      return false;
    };

    const component = mount(
      <AuthenticatedPage
        authenticate={auth}
        onUnauthenticated={onUnauthenticated}
        pageId={'some-page'}
      >
        <div />
      </AuthenticatedPage>
    );

    Promise.resolve(component)
      .then(() => component.update())
      .then(() => {
        expect(onUnauthenticated).toBeCalled();
        done();
      });
  });

  it('Should not show page contents if the user is unauthenticated', (done) => {
    const onUnauthenticated = jest.fn();
    const auth = async () => {
      return false;
    };

    const component = mount(
      <AuthenticatedPage
        authenticate={auth}
        onUnauthenticated={onUnauthenticated}
        pageId={'some-page'}
      >
        <div />
      </AuthenticatedPage>
    );

    Promise.resolve(component)
      .then(() => component.update())
      .then(() => {
        expect(onUnauthenticated).toBeCalled();
        expect(component.find(Navigation).exists()).toBe(false);
        done();
      });
  });

  it('Should look at cookie values to see if user is authenticated by default. If not present should be unauthenticated', (done) => {
    const onUnauthenticated = jest.fn();
    const component = mount(
      <AuthenticatedPage
        onUnauthenticated={onUnauthenticated}
        pageId={'some-page'}
      >
        <div />
      </AuthenticatedPage>
    );

    Promise.resolve(component)
      .then(() => component.update())
      .then(() => {
        expect(onUnauthenticated).toBeCalled();
        expect(component.find(Navigation).exists()).toBe(false);
        done();
      });
  });

  it('Should look at cookie values to see if user is authenticated by default. If present & a valid user should be authenticated', (done) => {
    const onUnauthenticated = jest.fn();
    jest
      .spyOn(CookieMonster, 'getCookie')
      .mockReturnValue({ access_token: 'someToken' });

    jest
      .spyOn(AuthenticationService, 'validateToken')
      .mockResolvedValue({ isValid: true });

    const component = mount(
      <AuthenticatedPage
        onUnauthenticated={onUnauthenticated}
        pageId={'some-page'}
      >
        <div />
      </AuthenticatedPage>
    );

    Promise.resolve(component)
      .then(() => component.update())
      .then(() => {
        expect(onUnauthenticated).toBeCalledTimes(0);
        done();
      });
  });
});
