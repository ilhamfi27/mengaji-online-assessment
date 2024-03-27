import { TeacherService } from '@/src/domains/teacher.service';
import {
  Body,
  createHandler,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
} from 'next-api-decorators';
import { UpdateTeacherRequest } from './request';

class DetailTeacherHandler {
  @Get('/:id')
  @HttpCode(200)
  show(@Param('id') id: string) {
    return TeacherService.getService().getTeacherById(id);
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

export default createHandler(DetailTeacherHandler);
