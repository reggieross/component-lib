import React from 'react';
import { Navigation } from './Navigation/Navigation';
import styles from './Page.module.scss';
import { AuthenticationService } from '../../service/AuthenticationService';
import { CookieMonster, CookieType } from '../../utils';

interface PageProps {
  pageId: string;
  onUnauthenticated: () => void;
  authenticate?: () => Promise<boolean>;
  children: React.ReactNode;
}

export const AuthenticatedPage: React.FC<PageProps> = ({
  onUnauthenticated,
  authenticate,
  pageId,
  children,
}) => {
  const [authenticated, setAuthenticated] = React.useState(false);
  const defaultAuth = async () => {
    const token: string = CookieMonster.getCookie(CookieType.ACCESS_TOKEN);
    if (!token) {
      return false;
    }
    const res = await AuthenticationService.validateToken(token);

    //TODO: Add Logic to retry if token is invalid and reLogin
    return res.isValid;
  };

  const onAuthenticate = authenticate ?? defaultAuth;
  React.useEffect(() => {
    onAuthenticate().then((authenticated) => {
      {
        console.log(authenticated)
        !authenticated ? onUnauthenticated() : setAuthenticated(true);
      }
    });
  }, []);

  return authenticated ? (
    <div>
      <Navigation selectedId={pageId} />
      <div className={styles['page-content']}>{children}</div>
    </div>
  ) : (
    <div />
  );
};
