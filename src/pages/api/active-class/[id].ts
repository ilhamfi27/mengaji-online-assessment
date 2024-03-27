import { ActiveClassService } from '@/src/domains/active-class.service';
import {
  Body,
  createHandler,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
} from 'next-api-decorators';
import { UpdateActiveClassRequest } from './request';

class DetailActiveClassHandler {
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

export default createHandler(DetailActiveClassHandler);
