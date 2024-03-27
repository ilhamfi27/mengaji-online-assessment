import { TeacherService } from '@/src/domains/teacher.service';
import { Body, createHandler, Get, HttpCode, Post } from 'next-api-decorators';
import { CreateTeacherRequest } from './request';

class TeacherHandler {
  @Get()
  @HttpCode(201)
  index() {
    return TeacherService.getService().getTeachers();
  }

  @Post()
  @HttpCode(200)
  create(@Body() body: CreateTeacherRequest) {
    return TeacherService.getService().createTeacher(body);
  }
}

export default createHandler(TeacherHandler);
