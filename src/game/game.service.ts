import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { OperationType } from './enums/operation-type.enum';
import { GeneratedExercise } from './interfaces/generated-operation.interface';
import { Socket } from 'socket.io';
import { SocketQuery } from './interfaces/socket-query.interface';

@Injectable()
export class GameService {
  public logConnection(client: Socket): void {
    const query = this.extractQuery(client);
    console.log(
      `User ${query.userId} with token ${query.token} connected with socket ID ${client.id}`,
    );
  }
  public logDisconnect(client: Socket): void {
    const query = this.extractQuery(client);
    console.log(`User ${query.userId} disconnected with socket ID ${client.id}`);
  }
  public generateExercise(operationType: OperationType): GeneratedExercise {
    let num1: number;
    let num2: number;
    let product: number;
    let remainder: number;
    
    switch (operationType) {
      case OperationType.ADDITION:
        num1 = Math.floor(Math.random() * 100) + 1;
        num2 = Math.floor(Math.random() * 100) + 1;
        return {
          operation: OperationType.ADDITION,
          num1,
          num2,
          result: num1 + num2,
          remainder: null,
        };
      case OperationType.SUBTRACTION:
        num1 = Math.floor(Math.random() * 100) + 50;
        num2 = Math.floor(Math.random() * 50) + 1;
        return {
          operation: OperationType.SUBTRACTION,
          num1,
          num2,
          result: num1 - num2,
          remainder: null,
        };
      case OperationType.MULTIPLICATION:
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        return {
          operation: OperationType.MULTIPLICATION, 
          num1,
          num2,
          result: num1 * num2,
          remainder: null,
        };
      case OperationType.DIVISION:
        num2 = Math.floor(Math.random() * 8) + 2;
        product = Math.floor(Math.random() * 9) + 1;
        remainder = Math.floor(Math.random() * (num2 - 1)) + 1;
        num1 = num2 * product + remainder;
        return {
          operation: OperationType.DIVISION,
          num1,
          num2,
          result: product,
          remainder
        };
      default:
        throw new Error("Unknown operation type");
    }
  }
  public generateGame(operationType: OperationType, count: number): GeneratedExercise[] {
    const exercises: GeneratedExercise[] = [];
    for (let i = 0; i < count; i++) {
      exercises.push(this.generateExercise(operationType));
    }
    return exercises;
  }
  private extractQuery(client: Socket): SocketQuery {
    return client.handshake.query as unknown as SocketQuery;
  }
}
