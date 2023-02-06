import { Module } from '@nestjs/common';
import { AuthController } from '../controllers';
import { AuthService, UserService } from '../services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { configService } from '../config/config.service';
import { JwtStrategy } from '../common/strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: configService.getJWT().secretKey,
      signOptions: {
        expiresIn: configService.getJWT().expiresIn,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService],
  exports: [JwtStrategy],
})
export class AuthModule {
}
