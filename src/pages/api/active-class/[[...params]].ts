import { ActiveClassService } from '@/src/domains/active-class.service';
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
import { CreateActiveClassRequest, UpdateActiveClassRequest } from './request';

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

  @Get('/:id')
  @HttpCode(200)
  show(@Param('id') id: string) {
    return ActiveClassService.getService().getActiveClassById(id);
  }

  @Put('/:id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() body: UpdateActiveClassRequest) {
    return ActiveClassService.getService().updateActiveClass(id, body);
  }

  @Delete('/:id')
  @HttpCode(200)
  delete(@Param('id') id: string) {
    return ActiveClassService.getService().deleteActiveClass(id);
  }
}

export default createHandler(ClassHandler);
