import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UserController],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'jwtpostgreskey455',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UserService, JwtStrategy, GoogleStrategy],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
