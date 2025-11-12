import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class LoginUserDto {
  @IsString()
  username: string
  
  @IsString()
  password: string;
}