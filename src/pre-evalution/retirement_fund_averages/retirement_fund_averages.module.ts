import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RetirementFundAveragesService } from './retirement_fund_averages.service';
import { RetirementFundAveragesController } from './retirement_fund_averages.controller';
import { RetirementFundAverage } from './entities/retirement_fund_averages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RetirementFundAverage])],
  controllers: [RetirementFundAveragesController],
  providers: [RetirementFundAveragesService],
  exports: [RetirementFundAveragesService],
})
export class RetirementFundAveragesModule {}