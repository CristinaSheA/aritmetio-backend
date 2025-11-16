import { IsDate, IsString, IsUUID } from "class-validator";


export class CreateOperationDto {
  @IsUUID()
  userId: string;
}
