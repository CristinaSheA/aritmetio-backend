import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './entities/operation.entity';

@Module({
  controllers: [StatsController],
  imports: [TypeOrmModule.forFeature([Operation])],
  providers: [StatsService],
  exports: [StatsService, TypeOrmModule],
})
export class StatsModule {}
