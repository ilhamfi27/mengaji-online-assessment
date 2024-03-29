import jwt from 'jsonwebtoken';
import { config } from '../config';

export const encode = (data: any) => {
  return jwt.sign(data, config.jwtSecret, {
    expiresIn: '1d',
  });
};

export const validate = (token: string) => {
  return jwt.verify(token, config.jwtSecret);
};
