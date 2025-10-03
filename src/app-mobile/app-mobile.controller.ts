import { Controller, ParseIntPipe } from '@nestjs/common';
import { AppMobileService } from './app-mobile.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppMobileController {
  constructor(private readonly appMobileService: AppMobileService) {}

  @MessagePattern('appMobile.contributions.allContributions')
  allContributions(
    @Payload('authorization') authorization: string,
    @Payload('affiliateId', ParseIntPipe) affiliateId: number,
  ) {
    return this.appMobileService.allContributions(authorization, affiliateId);
  }

  @MessagePattern('appMobile.contributions.contributionsPassive')
  contributionsPassive(
    @Payload('authorization') authorization: string,
    @Payload('affiliateId', ParseIntPipe) affiliateId: number,
  ) {
    return this.appMobileService.contributionsPassive(
      authorization,
      affiliateId,
    );
  }

  @MessagePattern('appMobile.contributions.contributionsActive')
  contributionsActive(
    @Payload('authorization') authorization: string,
    @Payload('affiliateId', ParseIntPipe) affiliateId: number,
  ) {
    return this.appMobileService.contributionsActive(
      authorization,
      affiliateId,
    );
  }

  @MessagePattern('appMobile.global.cities')
  globalCities() {
    return this.appMobileService.globalCities();
  }

  @MessagePattern('appMobile.loans.informationLoan')
  informationLoan(
    @Payload('authorization') authorization: string,
    @Payload('affiliateId', ParseIntPipe) affiliateId: number,
  ) {
    return this.appMobileService.informationLoan(authorization, affiliateId);
  }

  @MessagePattern('appMobile.loans.loanPrintPlan')
  loanPrintPlan(
    @Payload('authorization') authorization: string,
    @Payload('loanId', ParseIntPipe) loanId: number,
  ) {
    return this.appMobileService.loanPrintPlan(authorization, loanId);
  }

  @MessagePattern('appMobile.loans.loanPrintKardex')
  loanPrintKardex(
    @Payload('authorization') authorization: string,
    @Payload('loanId', ParseIntPipe) loanId: number,
  ) {
    return this.appMobileService.loanPrintKardex(authorization, loanId);
  }

  @MessagePattern('appMobile.refreshToken')
  refreshToken(
    @Payload('affiliateId', ParseIntPipe) affiliateId: number,
    @Payload('firebaseToken') firebaseToken: string,
  ) {
    return this.appMobileService.refreshToken(affiliateId, firebaseToken);
  }

  @MessagePattern('appMobile.verifyDevice')
  verifyDevice(@Payload('tokenId', ParseIntPipe) tokenId: number) {
    return this.appMobileService.verifyDevice(tokenId);
  }

  @MessagePattern('appMobile.version')
  version(@Payload() body: any) {
    return this.appMobileService.version(body);
  }

  @MessagePattern('appMobile.verifyToken')
  verifyToken(@Payload() body: any) {
    return this.appMobileService.verifyToken(body);
  }

  @MessagePattern('appMobile.deleteToken')
  deleteToken(@Payload() body: any) {
    return this.appMobileService.deleteToken(body);
  }

  @MessagePattern('appMobile.typeVerify')
  typeVerify(@Payload() body: any) {
    return this.appMobileService.typeVerify(body);
  }

  @MessagePattern('appMobile.ecoComAffiliateObservations')
  ecoComAffiliateObservations(
    @Payload('affiliateId', ParseIntPipe) affiliateId: number,
  ) {
    return this.appMobileService.ecoComAffiliateObservations(affiliateId);
  }

  @MessagePattern('appMobile.ecoComLiveness')
  ecoComLiveness(@Payload('authorization') authorization: string) {
    return this.appMobileService.ecoComLiveness(authorization);
  }

  @MessagePattern('appMobile.ecoComLivenessShow')
  ecoComLivenessShow(
    @Payload('authorization') authorization: string,
    @Payload('affiliateId', ParseIntPipe) affiliateId: number,
  ) {
    return this.appMobileService.ecoComLivenessShow(authorization, affiliateId);
  }

  @MessagePattern('appMobile.ecoComLivenessStore')
  ecoComLivenessStore(
    @Payload('authorization') authorization: string,
    @Payload('data') data: any,
  ) {
    return this.appMobileService.ecoComLivenessStore(authorization, data);
  }

  @MessagePattern('appMobile.ecoComEconomicComplements')
  ecoComEconomicComplements(
    @Payload('authorization') authorization: string,
    @Payload('page') page: number,
    @Payload('current') current: boolean,
  ) {
    return this.appMobileService.ecoComEconomicComplements(
      authorization,
      page,
      current,
    );
  }

  @MessagePattern('appMobile.ecoComEconomicComplementsShow')
  ecoComEconomicComplementsShow(
    @Payload('authorization') authorization: string,
    @Payload('economicComplementId', ParseIntPipe) economicComplementId: number,
  ) {
    return this.appMobileService.ecoComEconomicComplementsShow(
      authorization,
      economicComplementId,
    );
  }

  @MessagePattern('appMobile.ecoComEconomicComplementsStore')
  ecoComEconomicComplementsStore(
    @Payload('authorization') authorization: string,
    @Payload('data') data: any,
  ) {
    return this.appMobileService.ecoComEconomicComplementsStore(
      authorization,
      data,
    );
  }

  @MessagePattern('appMobile.ecoComEconomicComplementsPrint')
  ecoComEconomicComplementsPrint(
    @Payload('authorization') authorization: string,
    @Payload('economicComplementId', ParseIntPipe) economicComplementId: number,
  ) {
    return this.appMobileService.ecoComEconomicComplementsPrint(
      authorization,
      economicComplementId,
    );
  }

  @MessagePattern('appMobile.ecoComProcedure')
  ecoComProcedure(
    @Payload('authorization') authorization: string,
    @Payload('ecoComProcedureId', ParseIntPipe) ecoComProcedureId: number,
  ) {
    return this.appMobileService.ecoComProcedure(
      authorization,
      ecoComProcedureId,
    );
  }
}
