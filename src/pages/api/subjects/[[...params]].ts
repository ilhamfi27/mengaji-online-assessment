import { SubjectService } from '@/src/domains/subject.service';
import {
  Body,
  createHandler,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from 'next-api-decorators';
import { CreateSubjectRequest, UpdateSubjectRequest } from './request';

class SubjectHandler {
  @Get('/:id')
  @HttpCode(200)
  show(@Param('id') id: string) {
    return SubjectService.getService().getSubjectById(id);
  }

  @Get()
  @HttpCode(201)
  index(
    @Query('page') page: string,
    @Query('size') size: string,
    @Query('search') search: string
  ) {
    return SubjectService.getService().getSubjects({
      page: parseInt(page) || 1,
      size: parseInt(size) || 10,
      search,
    });
  }

  @Post()
  @HttpCode(200)
  create(@Body() body: CreateSubjectRequest) {
    return SubjectService.getService().createSubject(body);
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

export default createHandler(SubjectHandler);
