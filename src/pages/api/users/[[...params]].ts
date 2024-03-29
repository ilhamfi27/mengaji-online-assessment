import {
  Body,
  createHandler,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from 'next-api-decorators';
import { LoginRequest } from './request';
import { UserService } from '@/src/domains/user.service';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { SessionGuard } from '@/src/middlewares/AuthGuard';

class SubjectHandler {
  @Post('/login')
  @HttpCode(200)
  async show(@Body() body: LoginRequest, @Res() res: NextApiResponse) {
    const response = await UserService.getService().login(body);
    res.setHeader(
      'Set-Cookie',
      `mengaji-online-session=${response.token}; Path=/; HttpOnly`
    );
    return response;
  }

  @Get('/me')
  @SessionGuard()
  @HttpCode(200)
  async me(@Req() req: NextApiRequest) {
    return req.session.user;
  }

  @Post('/logout')
  @SessionGuard()
  @HttpCode(200)
  async logout(@Req() req: NextApiRequest, @Res() res: NextApiResponse) {
    req.session.user = null;
    res.setHeader('Set-Cookie', `mengaji-online-session=; Path=/; HttpOnly`);
    return { message: 'Logout success' };
  }
}

export default createHandler(SubjectHandler);
