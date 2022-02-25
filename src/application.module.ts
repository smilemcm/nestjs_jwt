import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { User, RefreshToken } from './models'

import { AuthenticationModule } from './modules/authentication/authentication.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nestjwt',
      password: '1234Qwer!@#$',
      database: 'nestjwt',
      autoLoadModels: true,
      synchronize: true,
      models: [User, RefreshToken],
    }),
    UsersModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class ApplicationModule {}
