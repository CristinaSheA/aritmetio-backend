import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StatsService } from './stats.service';
import { CreateOperationDto } from './dto/create-operation.dto';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}


  @Get('global-precision/:userId')
  getGlobalPrecision(@Param('userId') userId: string) {
    return this.statsService.getGlobalPrecision(userId);
  }
  @Get('weekly-precision/:userId')
  getWeeklyPrecision(@Param('userId') userId: string) {
    return this.statsService.getWeeklyPrecision(userId);
  }
  @Get('total-operations/:userId')
  getTotalOperations(@Param('userId') userId: string) {
    return this.statsService.getTotalOperations(userId);
  }
  @Get('weekly-operations/:userId')
  getWeeklyOperations(@Param('userId') userId: string) {
    return this.statsService.getWeeklyOperations(userId);
  }


  @Post()
  create(@Body() createOperationDto: CreateOperationDto) {
    return this.statsService.createOperation(createOperationDto);
  }
}
