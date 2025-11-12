import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto, CreateUserDto, UpdateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

 @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Esto redirige a Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req) {
    const user = req.user;

    const token = this.jwtService.sign({ sub: user.id, username: user.username });

    return {
      message: 'Google login exitoso',
      user,
      token,
    };
  }


  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
