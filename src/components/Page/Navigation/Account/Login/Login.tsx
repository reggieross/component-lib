import React from 'react';
import styles from './Login.module.scss';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { CircularProgress, InputBase } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import { CookieMonster, CookieType } from '../../../../../utils';
import {
  LoginResp,
  ResponseType,
} from '../../../../../service/AuthenticationService';

interface LoginDialogProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  onLogin: (userName: string, password: string) => Promise<LoginResp>;
}

export const LoginDialog: React.FC<LoginDialogProps> = ({
  modalOpen,
  setModalOpen,
  onLogin,
}) => {
  const [submitting, setSubmitting] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setErrorMessage] = React.useState<string | undefined>();

  const debouncedOnChange = (
    input: string,
    setValFunc: (val: string) => void
  ) => {
    if (!input || input.length === 0) {
      setValFunc('');
    } else {
      setValFunc(input.trim());
    }
  };

  const onChange = React.useCallback(
    (target: 'username' | 'password') => (event: any) => {
      switch (target) {
        case 'password':
          debouncedOnChange(event.target.value, setPassword);
          break;
        case 'username':
          debouncedOnChange(event.target.value, setUsername);
      }
    },
    []
  );

  const getErrorMessage = (status?: number) => {
    switch (status) {
      case 401:
        return 'The username or password specified is not valid';
      default:
        return 'Sorry and error occured. Please try again.';
    }
  };

  const openModalWithErrorMessage = (message: string) => {
    setModalOpen(true);
    setSubmitting(false);
    setErrorMessage(message);
  };

  const onSubmit = () => {
    if (password.length !== 0 && username.length !== 0) {
      setSubmitting(true);
      onLogin(username, password).then(
        (resp) => {
          if (resp === ResponseType.SUCCESS) {
            setSubmitting(false);
            setModalOpen(false);
            window.location.href = '/account';
          } else {
            openModalWithErrorMessage(getErrorMessage(resp.status));
          }
        },
        (e) => {
          openModalWithErrorMessage(getErrorMessage());
        }
      );
    }
  };

  const onShowPasswordClick = React.useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const disabledSubmit = password.length === 0 || username.length === 0;
  return (
    <div>
      <Dialog
        aria-labelledby="login-dialog"
        open={modalOpen}
        className={styles['root']}
        onClose={() => setModalOpen(false)}
      >
        <MuiDialogTitle disableTypography className={styles['title']}>
          <Typography variant="h6">Login</Typography>
        </MuiDialogTitle>
        <MuiDialogContent dividers>
          {error && (
            <Typography
              aria-label={'error-message'}
              className={styles['error']}
            >
              {error}
            </Typography>
          )}
          <div className={styles['form-input']}>
            <InputBase
              id={'username'}
              onChange={onChange('username')}
              placeholder="Username"
              inputProps={{ 'aria-label': 'username' }}
              inputComponent={'input'}
            />
            <div className={styles['password-input']}>
              <InputBase
                id={'password'}
                onChange={onChange('password')}
                placeholder="Password"
                inputProps={{ 'aria-label': 'password' }}
                inputComponent={'input'}
                type={showPassword ? 'text' : 'password'}
                value={password}
              />
              {!showPassword ? (
                <VisibilityOutlinedIcon onClick={onShowPasswordClick} />
              ) : (
                <VisibilityOffOutlinedIcon onClick={onShowPasswordClick} />
              )}
            </div>
          </div>
        </MuiDialogContent>
        <MuiDialogActions>
          <Button
            autoFocus={false}
            onClick={disabledSubmit ? () => {} : onSubmit}
            className={styles['button']}
            disabled={disabledSubmit}
          >
            {submitting ? (
              <CircularProgress style={{ height: '20px', width: '20px' }} />
            ) : (
              'Submit'
            )}
          </Button>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
};
