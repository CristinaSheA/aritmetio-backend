import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'jwtpostgreskey455',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UserService, JwtStrategy],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
