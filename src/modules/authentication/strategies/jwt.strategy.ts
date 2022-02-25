import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
// import {ExtractJwt, Strategy} from "@nest/passport-local";
import { ExtractJwt, Strategy } from 'passport-jwt'

import { UsersService } from '../../users/users.service'

import { User } from '../../../models'

export interface AccessTokenPayload {
  sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private users: UsersService

  public constructor (users: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '123456789',
      signOptions: {
        expiresIn: '5m',
      },
    })

    this.users = users
  }

  async validate (payload: AccessTokenPayload): Promise<User> {
    const { sub: id } = payload

    const user = await this.users.findForId(id)

    if (!user) {
      return null
    }

    return user
  }
}
