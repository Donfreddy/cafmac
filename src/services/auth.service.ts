import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../common/interfaces';
import * as _ from 'lodash';
import { User } from '../entities';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginDto } from '../dtos';
import { comparePasswords, hashPassword } from '../common/helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly user: UserService,
    private readonly jwt: JwtService,
  ) {
  }

  async login(inputs: LoginDto): Promise<any> {
    const { email, password } = inputs;
    const foundUser = await this.user.getWhere('email', email);

    if (!foundUser) {
      throw new UnauthorizedException('Incorrect email or password.');
    }

    const isMatch = await comparePasswords(password, foundUser.password);
    if (!isMatch) {
      throw new UnauthorizedException('Incorrect email or password.');
    }

    try {
      return await this.generateToken(foundUser);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async register(inputs: CreateUserDto): Promise<any> {
    inputs.password = await hashPassword(inputs.password);
    try {
      const user = await this.user.create(inputs);
      return { user: _.pick(user, ['id', 'email']) };
    } catch (error) {
      if (error?.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async forgotPassword(email: string) {
    //
  }

  async resetPassword(inputs: string): Promise<any> {
    //
  }

  private async generateToken(user: User): Promise<{ user: User, token: string }> {
    const payload: JwtPayload = { sub: user.id, email: user.email };
    const token = this.jwt.sign(payload);
    return { user: _.omit(user, ['password']), token };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.user.getWhere('email', payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return Promise.resolve(user);
  }
}
