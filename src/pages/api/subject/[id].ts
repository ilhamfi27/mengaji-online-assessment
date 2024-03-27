import { SubjectService } from '@/src/domains/subject.service';
import {
  Body,
  createHandler,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
} from 'next-api-decorators';
import { UpdateSubjectRequest } from './request';

class DetailSubjectHandler {
  @Get('/:id')
  @HttpCode(200)
  show(@Param('id') id: string) {
    return SubjectService.getService().getSubjectById(id);
  }

  @Put('/:id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() body: UpdateSubjectRequest) {
    return SubjectService.getService().updateSubject(id, body);
  }

  @Delete('/:id')
  @HttpCode(200)
  delete(@Param('id') id: string) {
    return SubjectService.getService().deleteSubject(id);
  }
}

export default createHandler(DetailSubjectHandler);
