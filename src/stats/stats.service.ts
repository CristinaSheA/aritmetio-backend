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

  public async getGlobalPrecision(userId: string): Promise<number> {
    const operations = await this.operationRepository.find({ where: { userId } });
    if (operations.length === 0) return 0;
    const correct = operations.filter(op => op.isCorrect).length;
    return (correct / operations.length) * 100;
  }

  // public async getWeeklyPrecision(userId: string): Promise<number> {
  //   const oneWeekAgo = new Date();
  //   oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  //   const operations = await this.operationRepository.find({ where: { userId } });
  //   const weekly = operations.filter(op => op.createdAt >= oneWeekAgo);
  //   if (weekly.length === 0) return 0;
  //   const correct = weekly.filter(op => op.isCorrect).length;
  //   return (correct / weekly.length) * 100 - await this.getGlobalPrecision(userId);
  // }

  public async getWeeklyPrecision(userId: string): Promise<number> {
      const now = new Date();

      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(now.getDate() - 7);

      const twoWeeksAgo = new Date(now);
      twoWeeksAgo.setDate(now.getDate() - 14);

      const operations = await this.operationRepository.find({ where: { userId } });

      // Semana actual
      const currentWeekOps = operations.filter(op => op.createdAt >= oneWeekAgo);
      const currentWeekCorrect = currentWeekOps.filter(op => op.isCorrect).length;
      const currentPrecision = currentWeekOps.length
        ? (currentWeekCorrect / currentWeekOps.length) * 100
        : 0;

      // Semana anterior
      const lastWeekOps = operations.filter(op => 
        op.createdAt >= twoWeeksAgo && op.createdAt < oneWeekAgo
      );
      const lastWeekCorrect = lastWeekOps.filter(op => op.isCorrect).length;
      const lastWeekPrecision = lastWeekOps.length
        ? (lastWeekCorrect / lastWeekOps.length) * 100
        : 0;

      return currentPrecision - lastWeekPrecision;
  }


  public async getTotalOperations(userId: string): Promise<Operation[]> {
    const operations = await this.operationRepository.find({ where: { userId } });
    if (operations.length === 0) return []
    console.log(operations);
    
    return operations;
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

  public createOperation(createOperationDto: CreateOperationDto): Promise<Operation> {
    const operation: Operation = {
      ...createOperationDto,
      createdAt: new Date(),
    }
    return this.operationRepository.save(operation)
  }
}
