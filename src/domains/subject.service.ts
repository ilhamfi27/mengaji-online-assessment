import { FindOneOptions, ILike, IsNull, Not } from 'typeorm';
import { PaginationParam } from '../@types/pagination';
import { SubjectRepository } from '../infrastructure/database/subject/subject.repository';
import {
  CreateSubjectRequest,
  UpdateSubjectRequest,
} from '../pages/api/subjects/request';
import { TeacherEntity } from '../infrastructure/database/teacher/teacher.entity';
import { SubjectEntity } from '../infrastructure/database/subject/subject.entity';
import { ConflictException } from 'next-api-decorators';

export class SubjectService {
  public static readonly service: SubjectService = new SubjectService();
  static getService(): SubjectService {
    return SubjectService.service;
  }

  async getSubjects(params: PaginationParam<string>) {
    let where = {};
    if (params.search) {
      where = [{ name: ILike(`%${params.search}%`) }, { code: params.search }];
    }
    const subjects = await SubjectRepository.getRepository().getPaginated(
      {
        page: params.page,
        size: params.size,
      },
      {
        where,
      }
    );
    return subjects;
  }

  async getArchivedSubjects(params: PaginationParam<string>) {
    let where: FindOneOptions<SubjectEntity>['where'] = [
      { deletedAt: Not(IsNull()) },
    ];
    if (params.search) {
      where.push({ name: ILike(`%${params.search}%`) });
      where.push({ code: params.search });
    }
    const teachers = await SubjectRepository.getRepository().getPaginated(
      {
        page: params.page,
        size: params.size,
      },
      {
        where,
        withDeleted: true,
      }
    );
    return teachers;
  }

  async getSubjectById(id: string) {
    const subject = await SubjectRepository.getRepository().find({
      where: { id },
    });
    return subject;
  }

  async createSubject(subject: CreateSubjectRequest) {
    const newSubject = await SubjectRepository.getRepository().save(subject);
    return newSubject;
  }

  async updateSubject(id: string, subject: UpdateSubjectRequest) {
    const updatedSubject = await SubjectRepository.getRepository().update(
      id,
      subject
    );
    return updatedSubject;
  }

  async deleteSubject(id: string) {
    const deletedSubject = await SubjectRepository.getRepository().softDelete(
      id
    );
    return deletedSubject;
  }

  async restoreSubject(id: string) {
    const restoredSubject = await SubjectRepository.getRepository().restore(id);
    return restoredSubject;
  }

  async existanceCheck(body: Partial<CreateSubjectRequest>, property: string) {
    const teacher = await SubjectRepository.getRepository().findOne({
      where: [
        { [property]: body[property as keyof Partial<CreateSubjectRequest>] },
      ],
    });
    if (teacher) {
      throw new ConflictException('Subject already exists');
    }
    return { exists: false };
  }
}
