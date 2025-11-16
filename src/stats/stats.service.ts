import { Injectable } from '@nestjs/common';
import { Operation } from './entities/operation.entity';
import { CreateOperationDto } from './dto/create-operation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Operation)
    private readonly operationRepository: Repository<Operation>,
  ) {}

  public getGlobalPrecision(userId: string): number {
   return 0;
  }
  public getWeeklyPrecision(userId: string): number {
    return 0;
  }
  public getAverageTimePerOperation(userId: string): number {
    return 0;
  }
  public async getTotalOperations(userId: string): Promise<number> {
    const allOperations = this.operationRepository.find();
    const userOperations = (await allOperations).filter(op => op.userId === userId);
    if (userOperations.length === 0) return 0
    console.log(userOperations);
    
    return userOperations.length;
  }
  public async getWeeklyOperations(userId: string): Promise<number> {
    const allOperations = this.operationRepository.find();
    const userOperations = (await allOperations).filter(op => op.userId === userId);
    const currentWeekOperations = userOperations.filter(op => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return op.createdAt >= oneWeekAgo;
    });
    return currentWeekOperations.length;
  }
  public getMaximumPunctuation(userId: string): number {
    return 0;
  }

  public createOperation(createOperationDto: CreateOperationDto): Promise<Operation> {
    const operation: Operation = {
      ...createOperationDto,
      createdAt: new Date(),
    }
    return this.operationRepository.save(operation)
  }
}
