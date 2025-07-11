import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { isUUID } from '@nestjs/class-validator';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      return await this.userRepository.save(user);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }
  public async login(loginUserDto: LoginUserDto) {
  const { password, username } = loginUserDto;
  const user = await this.userRepository.findOne({
    where: { username },
    select: { password: true, id: true, username: true },
  });

  if (!user) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (!isValidPassword) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  const payload = { sub: user.id, username: user.username };

  const token = this.jwtService.sign(payload);

  return {
    user: {
      id: user.id,
      username: user.username,
    },
    token,
  };
}

  public async update(id: string, updateUserDto: UpdateUserDto) {
    const { ...toUpdate } = updateUserDto;

    const user = await this.userRepository.preload({ id, ...toUpdate });

    return await this.userRepository.save(user);
  }
  public async remove(id: string) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    console.log(user);
  }
  public findAll() {
    return this.userRepository.find();
  }
  public async findOne(id: string) {
    if (isUUID(id)) {
      const user = await this.userRepository.findOneBy({ id: id });
      return user;
    }
  }
  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}
