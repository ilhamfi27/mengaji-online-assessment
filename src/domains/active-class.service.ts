import { ConflictException, NotFoundException } from 'next-api-decorators';
import { ActiveClassRepository } from '../infrastructure/database/active-class/active-class.repository';
import { TeacherRepository } from '../infrastructure/database/teacher/teacher.repository';
import {
  CreateActiveClassRequest,
  UpdateActiveClassRequest,
} from '../pages/api/active-class/request';
import { PaginationParam } from '../@types/pagination';
import { FindOneOptions, ILike, IsNull, Not } from 'typeorm';
import { ActiveClassEntity } from '../infrastructure/database/active-class/active-class.entity';
import { SubjectEntity } from '../infrastructure/database/subject/subject.entity';

export class ActiveClassService {
  public static readonly service: ActiveClassService = new ActiveClassService();
  static getService(): ActiveClassService {
    return ActiveClassService.service;
  }

  async getActiveClasses(params: PaginationParam<string>) {
    let where = {};
    if (params.search) {
      where = [{ name: ILike(`%${params.search}%`) }];
    }
    const subjects = await ActiveClassRepository.getRepository().getPaginated(
      {
        page: params.page,
        size: params.size,
      },
      {
        where,
        relations: ['teacher', 'teacher.subject'],
      }
    );
    return subjects;
  }

  async getArchivedActiveClass(params: PaginationParam<string>) {
    let where: FindOneOptions<SubjectEntity>['where'] = [
      { deletedAt: Not(IsNull()) },
    ];
    if (params.search) {
      where.push({ name: ILike(`%${params.search}%`) });
    }
    const teachers = await ActiveClassRepository.getRepository().getPaginated(
      {
        page: params.page,
        size: params.size,
      },
      {
        where,
        relations: ['teacher', 'teacher.subject'],
        withDeleted: true,
      }
    );
    return teachers;
  }

  async getActiveClassById(id: string) {
    const subject = await ActiveClassRepository.getRepository().find({
      where: { id },
    });
    return subject;
  }

  async createActiveClass(activeClass: CreateActiveClassRequest) {
    const teacher = await TeacherRepository.getRepository().findOne({
      where: { id: activeClass.teacher?.id },
    });
    const newActiveClass = await ActiveClassRepository.getRepository().save({
      name: activeClass.name,
      duration: activeClass.duration,
      dateAndTime: activeClass.dateAndTime,
      teacher: activeClass.teacher && teacher ? teacher : undefined,
    });
    return newActiveClass;
  }

  async updateActiveClass(id: string, activeClass: UpdateActiveClassRequest) {
    const updatedActiveClass =
      await ActiveClassRepository.getRepository().update(id, activeClass);
    return updatedActiveClass;
  }

  async deleteActiveClass(id: string) {
    const deletedActiveClass =
      await ActiveClassRepository.getRepository().softDelete(id);
    return deletedActiveClass;
  }

  async restoreActiveClass(id: string) {
    const restoredActiveClass =
      await ActiveClassRepository.getRepository().restore(id);
    return restoredActiveClass;
  }

  async existanceCheck(body: Partial<CreateActiveClassRequest>, property: string) {
    const teacher = await TeacherRepository.getRepository().findOne({
      where: [
        { [property]: body[property as keyof Partial<CreateActiveClassRequest>] },
      ],
    });
    if (teacher) {
      throw new ConflictException('Active class already exists');
    }
    return { exists: false };
  }
}
