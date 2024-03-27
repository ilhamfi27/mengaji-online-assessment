import { SubjectRepository } from '../infrastructure/database/subject/subject.repository';
import {
  CreateSubjectRequest,
  UpdateSubjectRequest,
} from '../pages/api/subject/request';

export class SubjectService {
  public static readonly service: SubjectService = new SubjectService();
  static getService(): SubjectService {
    return SubjectService.service;
  }

  async getSubjects() {
    const subjects = await SubjectRepository.getRepository().getPaginated();
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
