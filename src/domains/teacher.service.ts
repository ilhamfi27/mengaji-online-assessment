import { ConflictException, NotFoundException } from 'next-api-decorators';
import { TeacherRepository } from '../infrastructure/database/teacher/teacher.repository';
import {
  CreateTeacherRequest,
  UpdateTeacherRequest,
} from '../pages/api/teachers/request';
import { PaginationParam } from '../@types/pagination';
import { ILike } from 'typeorm';
import { SubjectRepository } from '../infrastructure/database/subject/subject.repository';

export class TeacherService {
  public static readonly service: TeacherService = new TeacherService();
  static getService(): TeacherService {
    return TeacherService.service;
  }

  async getTeachers(params: PaginationParam<string>) {
    let where = {};
    if (params.search) {
      where = [
        { name: ILike(`%${params.search}%`) },
        { email: ILike(`%${params.search}%`) },
        { employeeId: params.search },
      ];
    }
    const teachers = await TeacherRepository.getRepository().getPaginated(
      {
        page: params.page,
        size: params.size,
      },
      {
        where,
        relations: ['subject'],
      }
    );
    return teachers;
  }

  async getTeacherById(id: string) {
    const teacher = await TeacherRepository.getRepository().find({
      where: { id },
      relations: ['subject'],
    });
    return teacher;
  }

  async createTeacher(teacher: CreateTeacherRequest) {
    const subject = await SubjectRepository.getRepository().findOne({
      where: { id: teacher.subject.id },
    });
    if (!subject) {
      throw new NotFoundException('Subject does not exist');
    }
    const teacherExists = await TeacherRepository.getRepository().findOne({
      where: [{ email: teacher.email }, { employeeId: teacher.employeeId }],
    });
    if (teacherExists) {
      throw new ConflictException('Teacher already exists');
    }
    const newTeacher = await TeacherRepository.getRepository().save({
      ...teacher,
      subject,
    });
    return newTeacher;
  }

  async updateTeacher(id: string, teacher: UpdateTeacherRequest) {
    const subject = await SubjectRepository.getRepository().findOne({
      where: { id: teacher.subject.id },
    });
    if (!subject) {
      throw new NotFoundException('Subject does not exist');
    }
    const updatedTeacher = await TeacherRepository.getRepository().update(id, {
      ...teacher,
      subject,
    });
    return updatedTeacher;
  }

  async deleteTeacher(id: string) {
    const deletedTeacher = await TeacherRepository.getRepository().softDelete(
      id
    );
    return deletedTeacher;
  }
}
