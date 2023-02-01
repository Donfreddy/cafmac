import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../../services';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { configService } from '../../config/config.service';
import { JwtPayload } from '../interfaces';
import { User } from 'src/entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly auth: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getJWT().secretKey,
      ignoreExpiration: true,
    });
  }

  async validate(payload: JwtPayload, done: any): Promise<User> {
    console.log('Hello from JwtStrategy');
    const user = await this.auth.validateUser(payload);
    if (!user) {
      done(new UnauthorizedException(), false);
    }
    return done(null, user);
  }
}