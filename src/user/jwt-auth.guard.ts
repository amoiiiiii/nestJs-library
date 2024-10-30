import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isAuthenticated = await super.canActivate(context);

    // Jika tidak ada pengguna yang terautentikasi, lempar UnauthorizedException
    if (!isAuthenticated) {
      throw new UnauthorizedException('Anda tidak terautentikasi');
    }

    // Memeriksa apakah pengguna memiliki peran admin
    const user = request.user;
    if (user && user.role === 'admin') {
      return true;
    } else {
      throw new UnauthorizedException('Anda tidak memiliki izin sebagai admin');
    }
  }
}
