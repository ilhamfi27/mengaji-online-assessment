import { ActiveClassService } from '@/src/domains/active-class.service';
import { Body, createHandler, Get, HttpCode, Post } from 'next-api-decorators';
import { CreateActiveClassRequest } from './request';

class ClassHandler {
  @Get()
  @HttpCode(201)
  index() {
    return ActiveClassService.getService().getActiveClasses();
  }

  @Post()
  @HttpCode(200)
  create(@Body() body: CreateActiveClassRequest) {
    return ActiveClassService.getService().createActiveClass(body);
  }
}

export default createHandler(ClassHandler);
