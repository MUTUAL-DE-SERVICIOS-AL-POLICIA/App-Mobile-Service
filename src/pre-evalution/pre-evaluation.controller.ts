import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PreEvaluationService } from './pre-evaluation.service';

@Controller()
export class PreEvaluationController {
  constructor(private readonly preEvalService: PreEvaluationService) {}

  @MessagePattern('preEvaluation.affiliateInfo')
  getAffiliate(@Payload('affiliateId', ParseIntPipe) affiliateId: number) {
    return this.preEvalService.getAffiliateInfo(affiliateId);
  }

  @MessagePattern('preEvaluation.loanModalities')
  getModalities(@Payload('affiliateId', ParseIntPipe) affiliateId: number) {
    return this.preEvalService.getLoanModalities(affiliateId);
  }

  @MessagePattern('preEvaluation.loanDocuments')
  getDocuments(
    @Payload('affiliateId', ParseIntPipe) affiliateId: number,
    @Payload('procedureModalityId', ParseIntPipe) procedureModalityId: number,
  ) {
    return this.preEvalService.getLoanDocuments(affiliateId, procedureModalityId);
  }

  @MessagePattern('preEvaluation.recentContributions')
  getRecentContributions(
    @Payload('authorization') authorization: string,
    @Payload('affiliateId', ParseIntPipe) affiliateId: number,
  ) {
    return this.preEvalService.getRecentContributions(authorization, affiliateId);
  }

  @MessagePattern('preEvaluation.retirementFundAverage')
  getRetirementFundAverage(@Payload('affiliateId', ParseIntPipe) affiliateId: number) {
    return this.preEvalService.getRetirementFundAverage(affiliateId);
  }

}
