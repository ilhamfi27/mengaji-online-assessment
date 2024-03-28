import { ConflictException } from 'next-api-decorators';
import { TeacherRepository } from '../infrastructure/database/teacher/teacher.repository';
import {
  CreateTeacherRequest,
  UpdateTeacherRequest,
} from '../pages/api/teachers/request';
import { PaginationParam } from '../@types/pagination';
import { TeacherEntity } from '../infrastructure/database/teacher/teacher.entity';
import { ILike } from 'typeorm';

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
      ]
    }
    const teachers = await TeacherRepository.getRepository().getPaginated(
      {
        page: params.page,
        size: params.size,
      },
      {
        where,
      }
    );
    return teachers;
  }

  async getTeacherById(id: string) {
    const teacher = await TeacherRepository.getRepository().find({
      where: { id },
    });
    return teacher;
  }

  async createTeacher(teacher: CreateTeacherRequest) {
    const teacherExists = await TeacherRepository.getRepository().findOne({
      where: [{ email: teacher.email }, { employeeId: teacher.employeeId }],
    });
    if (teacherExists) {
      throw new ConflictException('Teacher already exists');
    }
    const newTeacher = await TeacherRepository.getRepository().save(teacher);
    return newTeacher;
  }

  async updateTeacher(id: string, teacher: UpdateTeacherRequest) {
    const updatedTeacher = await TeacherRepository.getRepository().update(
      id,
      teacher
    );
    return updatedTeacher;
  }

  async deleteTeacher(id: string) {
    const deletedTeacher = await TeacherRepository.getRepository().softDelete(
      id
    );
    return deletedTeacher;
  }
}
