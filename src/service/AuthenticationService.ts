import { HttpClient } from './client/HttpClient';
import { CookieMonster } from '../utils';
import { ENV } from '../env';
import { UserInfo } from '../components/Page/Navigation/Account/Account';

const authServiceURI = ENV.AUTHENTICATION_URL;
export enum ResponseType {
  SUCCESS,
}

export type LoginResp =
  | ResponseType
  | {
      status: number;
      message: string;
    };

export interface ValidateTokenResponse {
  isValid: boolean;
  user?: UserInfo;
}

const login = async (
  username: string,
  password: string
): Promise<LoginResp> => {
  const res = await HttpClient.post(`${authServiceURI}/login/user`, {
    username,
    password,
  });

  return res.statusCode === 200
    ? ResponseType.SUCCESS
    : { status: res.statusCode, message: '' };
};

const validateToken = async (
  accessToken: string
): Promise<ValidateTokenResponse> => {
  return { isValid: true };
};

export const AuthenticationService = {
  login,
  validateToken,
};
