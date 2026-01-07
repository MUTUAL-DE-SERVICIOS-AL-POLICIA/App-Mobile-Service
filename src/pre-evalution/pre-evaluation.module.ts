import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreEvaluationController } from './pre-evaluation.controller';
import { PreEvaluationService } from './pre-evaluation.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [PreEvaluationController],
  providers: [PreEvaluationService],
})
export class PreEvaluationModule {}
