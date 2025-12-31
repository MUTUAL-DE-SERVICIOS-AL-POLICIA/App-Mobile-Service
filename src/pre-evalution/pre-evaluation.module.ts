import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreEvaluationController } from './pre-evaluation.controller';
import { PreEvaluationService } from './pre-evaluation.service';
import { RetirementFundAveragesModule } from './retirement_fund_averages/retirement_fund_averages.module';

@Module({
  imports: [TypeOrmModule.forFeature([]), RetirementFundAveragesModule],
  controllers: [PreEvaluationController],
  providers: [PreEvaluationService],
})
export class PreEvaluationModule {}
