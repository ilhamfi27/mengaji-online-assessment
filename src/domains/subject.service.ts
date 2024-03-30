import { ILike } from 'typeorm';
import { PaginationParam } from '../@types/pagination';
import { SubjectRepository } from '../infrastructure/database/subject/subject.repository';
import {
  CreateSubjectRequest,
  UpdateSubjectRequest,
} from '../pages/api/subjects/request';

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
}
