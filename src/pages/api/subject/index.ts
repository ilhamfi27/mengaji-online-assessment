import { SubjectService } from '@/src/domains/subject.service';
import { Body, createHandler, Get, HttpCode, Post } from 'next-api-decorators';
import { CreateSubjectRequest } from './request';

class SubjectHandler {
  @Get()
  @HttpCode(201)
  index() {
    return SubjectService.getService().getSubjects();
  }

  @Post()
  @HttpCode(200)
  create(@Body() body: CreateSubjectRequest) {
    return SubjectService.getService().createSubject(body);
  }
}

export default createHandler(SubjectHandler);
