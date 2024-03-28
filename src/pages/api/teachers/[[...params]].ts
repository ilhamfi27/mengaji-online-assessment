import { TeacherService } from '@/src/domains/teacher.service';
import {
  Body,
  createHandler,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from 'next-api-decorators';
import { CreateTeacherRequest, UpdateTeacherRequest } from './request';

class TeacherHandler {
  @Get('/:id')
  @HttpCode(200)
  show(@Param('id') id: string) {
    return TeacherService.getService().getTeacherById(id);
  }
  @Get()
  @HttpCode(200)
  index() {
    return TeacherService.getService().getTeachers();
  }

  @Post()
  @HttpCode(201)
  create(@Body() body: CreateTeacherRequest) {
    return TeacherService.getService().createTeacher(body);
  }

  @Put('/:id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() body: UpdateTeacherRequest) {
    return TeacherService.getService().updateTeacher(id, body);
  }

  @Delete('/:id')
  @HttpCode(200)
  delete(@Param('id') id: string) {
    return TeacherService.getService().deleteTeacher(id);
  }
}

export default createHandler(TeacherHandler);