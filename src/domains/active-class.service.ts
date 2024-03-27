import { ActiveClassRepository } from '../infrastructure/database/active-class/active-class.repository';
import {
  CreateActiveClassRequest,
  UpdateActiveClassRequest,
} from '../pages/api/active-class/request';

export class ActiveClassService {
  public static readonly service: ActiveClassService = new ActiveClassService();
  static getService(): ActiveClassService {
    return ActiveClassService.service;
  }

  async getActiveClasses() {
    const subjects = await ActiveClassRepository.getRepository().getPaginated();
    return subjects;
  }

  async getActiveClassById(id: string) {
    const subject = await ActiveClassRepository.getRepository().find({
      where: { id },
    });
    return subject;
  }

  async createActiveClass(subject: CreateActiveClassRequest) {
    const newActiveClass = await ActiveClassRepository.getRepository().save(
      subject
    );
    return newActiveClass;
  }

  async updateActiveClass(id: string, subject: UpdateActiveClassRequest) {
    const updatedActiveClass =
      await ActiveClassRepository.getRepository().update(id, subject);
    return updatedActiveClass;
  }

  async deleteActiveClass(id: string) {
    const deletedActiveClass =
      await ActiveClassRepository.getRepository().softDelete(id);
    return deletedActiveClass;
  }
}
