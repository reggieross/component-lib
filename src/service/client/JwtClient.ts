import { verify } from 'jsonwebtoken';
import { ENV } from '../../../src/env';


const decodeToken = async (
    accessToken: string
): Promise<object> => {
    try {
        const decodedToken = verify(accessToken, ENV.JWT_PRIVATE_KEY);
        return decodedToken as object;
    } catch (e) {
        throw e;
    }
};

export const JwtClient = {
    decodeToken,
};
