import React from 'react';
import styles from './Account.module.scss';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { CookieMonster, CookieType } from '../../../../utils';
import { LoginDialog } from './Login/Login';
import { AuthenticationService } from '../../../../service/AuthenticationService';

interface AccountProps {}

export interface UserInfo {
  name?: string;
}

export const Account: React.FC<AccountProps> = (props) => {
  const [userInfo, setUserInfo] = React.useState<UserInfo | undefined>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    //TODO: Make correct type for cookie should probably be UserInfo?
    const cookieValue = CookieMonster.getCookie<any>(CookieType.ACCESS_TOKEN);
    // TODO: Parse Access token to get cookie values
    if (cookieValue) {
      setUserInfo({
        name: 'Test User',
      });
    }
  }, []);

  const login = async (username: string, password: string) => {
    return await AuthenticationService.login(username, password);
  };

  const onAccountIconClick = React.useCallback(() => {
    if (!userInfo) {
      setModalOpen(true);
    } else {
      window.location.href = '/account';
    }
  }, []);

  return (
    <div className={styles['root']}>
      {userInfo && userInfo.name && `Hello ${userInfo.name}`}
      <AccountCircleOutlinedIcon onClick={onAccountIconClick} />
      <LoginDialog
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        onLogin={login}
      />
    </div>
  );
};
