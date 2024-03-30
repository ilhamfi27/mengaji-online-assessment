import { TeacherService } from '@/src/domains/teacher.service';
import {
  Body,
  createHandler,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
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
  index(
    @Query('page') page: string,
    @Query('size') size: string,
    @Query('search') search: string
  ) {
    return TeacherService.getService().getTeachers({
      page: parseInt(page) || 1,
      size: parseInt(size) || 10,
      search,
    });
  }

  @Get('/archived/all')
  @HttpCode(200)
  archived(
    @Query('page') page: string,
    @Query('size') size: string,
    @Query('search') search: string
  ) {
    return TeacherService.getService().getArchivedTeachers({
      page: parseInt(page) || 1,
      size: parseInt(size) || 10,
      search,
    });
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

  @Patch('/:id/restore')
  @HttpCode(200)
  restore(@Param('id') id: string) {
    return TeacherService.getService().restoreTeacher(id);
  }

  @Post('/:property/exists')
  @HttpCode(200)
  exists(
    @Param('property') property: string,
    @Body() body: Partial<CreateTeacherRequest>
  ) {
    return TeacherService.getService().existanceCheck(body, property);
  }
}

export default createHandler(TeacherHandler);
