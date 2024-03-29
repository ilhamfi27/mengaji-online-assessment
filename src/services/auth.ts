import { UserLogin, UserType } from '../@types/user';
import { request } from './request';

export const login = ({ email, password }: UserLogin) => {
  return request.post('/users/login', { email, password });
};
export const register = ({ name, email, password }: UserType) => {
  return request.post('/users', { name, email, password });
};
export const getProfile = () => {
  return request.get('/users/me');
};
export const logout = () => {
  return request.post('/users/logout');
};
