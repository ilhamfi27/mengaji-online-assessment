import { hashString } from '@/src/utils/hash';
import { UserEntity, UserRole } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { DatabaseProvider } from '.';
import { DataSource } from 'typeorm';

const seedUser = async (dataSource: DataSource) => {
  const users = [
    new UserEntity({
      email: 'admin@test.net',
      name: 'Admin',
      password: hashString('admin'),
      role: UserRole.ADMIN,
    }),
  ];
  for (const user of users) {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values(user)
      .onConflict(`("email") DO NOTHING`)
      .execute();

    await dataSource
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values(user)
      .onConflict(
        `("email") DO UPDATE SET "password" = :password, "role" = :role`
      )
      .setParameter('password', user.password)
      .setParameter('role', user.role)
      .execute();
  }
};

const main = async () => {
  await DatabaseProvider.initialize();
  const dataSource = DatabaseProvider.datasource;
  seedUser(dataSource);
};

main();
