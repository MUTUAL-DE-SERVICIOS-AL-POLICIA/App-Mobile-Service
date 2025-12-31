import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RetirementFundAveragesService } from './retirement_fund_averages.service';

@Controller()
export class RetirementFundAveragesController {
  constructor(private readonly retirementFundAveragesService: RetirementFundAveragesService) {}

  @MessagePattern('retirementFundAverages.findAll')
  findAll() {
    return this.retirementFundAveragesService.findAll();
  }

  @MessagePattern('retirementFundAverages.findOne')
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.retirementFundAveragesService.findOne(id);
  }

  @MessagePattern('retirementFundAverages.findByDegreeId')
  findByDegreeId(@Payload('degreeId', ParseIntPipe) degreeId: number) {
    return this.retirementFundAveragesService.findByDegreeId(degreeId);
  }

  @MessagePattern('retirementFundAverages.findByCategoryId')
  findByCategoryId(@Payload('categoryId', ParseIntPipe) categoryId: number) {
    return this.retirementFundAveragesService.findByCategoryId(categoryId);
  }

  @MessagePattern('retirementFundAverages.findByDegreeAndCategory')
  findByDegreeAndCategory(
    @Payload('degreeId', ParseIntPipe) degreeId: number,
    @Payload('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.retirementFundAveragesService.findByDegreeAndCategory(degreeId, categoryId);
  }
}