import { IsBoolean, IsDate, IsString, IsUUID } from "class-validator";


export class CreateOperationDto {
  @IsUUID()
  userId: string;
  @IsBoolean()
  isCorrect: boolean;
  @IsString()
  operationType: string;
}
