import {
  EntityTarget,
  FindManyOptions,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { DatabaseProvider } from '.';
import { Paginated, PaginationParam } from '@/src/@types/pagination';

export class BaseRepository<E extends ObjectLiteral> extends Repository<E> {
  constructor(entity: EntityTarget<E>) {
    const baseRepository =
      DatabaseProvider.getDatasource().getRepository<E>(entity);
    super(
      baseRepository.target,
      baseRepository.manager,
      baseRepository.queryRunner
    );
  }
  async getPaginated(
    { page, size }: PaginationParam = { page: 1, size: 10 },
    options: FindManyOptions<E> = {}
  ): Promise<Paginated<E>> {
    page = parseInt(page.toString()) || 1;
    size = parseInt(size.toString()) || 10;
    const [items, totalItems] = await this.findAndCount({
      skip: (page - 1) * size,
      take: size,
      ...options,
    });
    const totalPages = Math.ceil(totalItems / size);
    const totalSize = totalItems;

    return {
      items,
      page,
      size,
      totalPages,
      totalSize,
    };
  }
}
