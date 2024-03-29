import { UserEntity } from '../infrastructure/database/user/user.entity';

declare module 'next' {
  interface NextApiRequest {
    session: { user?: UserEntity | null };
  }
}
