import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token, Device } from './entities';
import { NatsService } from 'src/common';
import * as crypto from 'crypto';

@Injectable()
export class AppMobileService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
    private readonly nats: NatsService,
  ) {}

  async allContributions(affiliateId: number): Promise<any> {
    const data = await this.nats.firstValue('pvtSti.allContributions', {
      affiliateId,
    });

    if (!data.serviceStatus) {
      return {
        message: 'Error en el servicio pvtSti.allContributions',
        serviceStatus: false,
      };
    }
    return data;
  }

  async contributionsPassive(affiliateId: number): Promise<any> {
    const response = await this.nats.firstValue('pvtSti.contributionsPassive', {
      affiliateId,
    });

    const { serviceStatus } = response;

    if (!serviceStatus) {
      return {
        message: 'Error en el servicio pvtSti.loanPrintPlan',
        serviceStatus: false,
      };
    }

    if (typeof response.data === 'string') {
      return {
        message: response.data,
        serviceStatus: response.serviceStatus,
      };
    }

    return {
      name: response.filename,
      binaryPdf: response.content,
      serviceStatus: response.serviceStatus,
    };
  }

  async contributionsActive(affiliateId: number): Promise<any> {
    const response = await this.nats.firstValue('pvtSti.contributionsActive', {
      affiliateId,
    });

    const { serviceStatus } = response;

    if (!serviceStatus) {
      return {
        message: 'Error en el servicio pvtSti.loanPrintPlan',
        serviceStatus: false,
      };
    }

    if (typeof response.data === 'string') {
      return {
        message: response.data,
        serviceStatus: response.serviceStatus,
      };
    }

    return {
      name: response.filename,
      binaryPdf: response.content,
      serviceStatus: response.serviceStatus,
    };
  }

  async globalCities() {
    const { data, serviceStatus } = await this.nats.firstValue(
      'cities.findAll',
      [
        'id',
        'name',
        'latitude',
        'longitude',
        'companyAddress',
        'phonePrefix',
        'companyPhones',
        'companyCellphones',
      ],
    );

    if (!serviceStatus) {
      return {
        message: 'Error en el servicio cities.findAll',
        serviceStatus: serviceStatus,
      };
    }

    const filteredCities = data.filter((city) => Number(city.phonePrefix) > 0);
    return {
      serviceStatus: serviceStatus,
      message: 'Ciudades obtenidas correctamente',
      data: filteredCities,
    };
  }

  async informationLoan(affiliateId: number): Promise<any> {
    const data = await this.nats.firstValue('pvtSti.informationLoan', {
      affiliateId,
    });

    if (!data.serviceStatus) {
      return {
        message: 'Error en el servicio pvtSti.informationLoan',
        serviceStatus: false,
      };
    }
    return data;
  }

  async loanPrintPlan(loanId: number): Promise<any> {
    const response = await this.nats.firstValue('pvtSti.loanPrintPlan', {
      loanId,
    });

    const { serviceStatus } = response;

    if (!serviceStatus) {
      return {
        message: 'Error en el servicio pvtSti.loanPrintPlan',
        serviceStatus: false,
      };
    }

    if (typeof response.data === 'string') {
      return {
        message: response.data,
        serviceStatus: response.serviceStatus,
      };
    }

    return {
      name: response.filename,
      binaryPdf: response.content,
      serviceStatus: response.serviceStatus,
    };
  }

  async loanPrintKardex(loanId: number): Promise<any> {
    const response = await this.nats.firstValue('pvtSti.loanPrintKardex', {
      loanId,
    });

    const { serviceStatus } = response;

    if (!serviceStatus) {
      return {
        message: 'Error en el servicio pvtSti.loanPrintKardex',
        serviceStatus: false,
      };
    }

    if (typeof response.data === 'string') {
      return {
        message: response.data,
        serviceStatus: response.serviceStatus,
      };
    }

    return {
      name: response.filename,
      binaryPdf: response.content,
      serviceStatus: response.serviceStatus,
    };
  }

  async refreshToken(affiliateId: number, firebaseToken: string): Promise<any> {
    const apiToken = crypto.randomBytes(32).toString('hex');

    let token = await this.tokenRepository.findOne({
      where: { affiliateId },
    });

    if (token) {
      token.apiToken = apiToken;
      token.updatedAt = new Date();
      token.firebaseToken = firebaseToken;
    } else {
      token = this.tokenRepository.create({
        affiliateId,
        apiToken,
        createdAt: new Date(),
        firebaseToken: firebaseToken,
      });
    }

    await this.tokenRepository.save(token);

    return {
      tokenId: token.id,
      message: 'Token actualizado',
      apiToken,
    };
  }

  async verifyDevice(tokenId: number): Promise<any> {
    let device = await this.deviceRepository.findOne({
      where: { affiliateTokenId: tokenId },
    });

    if (!device) {
      device = this.deviceRepository.create({
        affiliateTokenId: tokenId,
        createdAt: new Date(),
        verified: false,
        enrolled: false,
      });
      await this.deviceRepository.save(device);
    }

    return {
      verified: device.verified,
      enrolled: device.enrolled,
    };
  }

  async version(body: any) {
    const { store, version } = body;

    const stores: Record<string, { url: string; validVersions: string[] }> = {
      playstore: {
        url: 'https://play.google.com/store/apps/details?id=com.muserpol.pvt',
        validVersions: ['3.0.8', '3.0.9'],
      },
      appstore: {
        url: 'https://apps.apple.com/app/id284815942',
        validVersions: ['2.2.1'],
      },
      appgallery: {
        url: 'https://appgallery.huawei.com/app/C106440831',
        validVersions: ['3.0.5', '3.0.6', '3.0.7', '3.0.8'],
      },
    };

    const config = stores[store];

    if (!config) {
      return {
        error: true,
        message: 'Parámetros incorrectos',
        data: [],
      };
    }

    return {
      error: config.validVersions.includes(version) ? false : true,
      message: config.validVersions.includes(version)
        ? 'Versión correcta'
        : 'Versión incorrecta',
      url: config.url,
    };
  }

  async verifyToken(body: any): Promise<any> {
    const { apiToken } = body;
    const token = await this.tokenRepository.findOne({
      where: { apiToken },
    });

    if (!token) {
      return {
        error: true,
        message: 'Token no encontrado, Usuario no autenticado',
      };
    }

    return {
      error: false,
      message: 'Token encontrado, Usuario autorizado',
      affiliateId: token.affiliateId,
      tokenId: token.id,
    };
  }

  async deleteToken(body: any): Promise<any> {
    const { affiliateId } = body;
    const token = await this.tokenRepository.findOne({
      where: { affiliateId: affiliateId },
    });

    if (!token) {
      return {
        error: true,
        message: 'Token no encontrado, usuario no autenticado',
      };
    }

    token.apiToken = null;
    token.updatedAt = new Date();
    await this.tokenRepository.save(token);

    return {
      error: false,
      message: 'Token eliminado, Cierre de sesión exitoso',
    };
  }

  async typeVerify(body: any): Promise<any> {
    const { type, tokenId } = body;

    const { enrolled, verified } = await this.verifyDevice(tokenId);

    const responses: Record<string, any> = {
      before_liveness: {
        error: false,
        message: 'Mensaje de cámara',
        data: {
          title: enrolled ? 'CONTROL DE VIVENCIA' : 'PROCESO DE ENROLAMIENTO',
          content:
            'Siga las instrucciones, para comenzar presione el botón azul de "INICIAR"',
        },
      },
      verified: {
        error: false,
        message: 'Verificación de CI',
        data: { verified },
      },
    };

    return (
      responses[type] ?? {
        error: true,
        message: 'Error',
        data: {
          title: 'Error',
          content:
            'Ocurrió un error inesperado, comuníquese con el personal de MUSERPOL.',
        },
      }
    );
  }

  async ecoComAffiliateObservations(affiliateId: number) {
    const data = await this.nats.firstValue(
      'pvtBe.ecoComAffiliateObservations',
      { affiliateId },
    );

    if (!data.serviceStatus) {
      return {
        message: 'Error en el servicio pvtBe.ecoComAffiliateObservations',
        error: true,
      };
    }
    return data;
  }

  async ecoComLiveness(authorization: string) {
    const data = await this.nats.firstValue('pvtBe.ecoComLiveness', {
      authorization,
    });
    if (!data.serviceStatus) {
      return {
        message:
          'Error en el servicio pvtBe.ecoComLiveness, Ocurrió un error inesperado, comunicarse con el personal de MUSERPOL.',
        error: true,
      };
    }
    return data;
  }

  async ecoComLivenessShow(authorization: string, affiliateId: number) {
    const data = await this.nats.firstValue('pvtBe.ecoComLivenessShow', {
      authorization,
      affiliateId,
    });
    if (!data.serviceStatus) {
      return {
        message:
          'Error en el servicio pvtBe.ecoComLivenessShow, No es posible crear trámites',
        error: true,
        data: [],
      };
    }
    return data;
  }

  async ecoComLivenessStore(authorization: string, data: any) {
    const dataResponse = await this.nats.firstValue(
      'pvtBe.ecoComLivenessStore',
      { authorization, data },
    );
    if (!dataResponse.serviceStatus) {
      return {
        message: 'Error en el servicio pvtBe.ecoComLivenessStore',
        error: true,
      };
    }
    return dataResponse;
  }

  async ecoComEconomicComplements(
    authorization: string,
    page: number,
    current: boolean,
  ) {
    const data = await this.nats.firstValue('pvtBe.ecoComEconomicComplements', {
      authorization,
      page,
      current,
    });

    if (!data.serviceStatus) {
      return {
        message:
          'Error en el servicio pvtBe.ecoComEconomicComplements, Dispositivo Invalido',
        error: true,
      };
    }
    return data;
  }

  async ecoComEconomicComplementsShow(
    authorization: string,
    economicComplementId: number,
  ) {
    const data = await this.nats.firstValue(
      'pvtBe.ecoComEconomicComplementsShow',
      { authorization, economicComplementId },
    );
    if (!data.serviceStatus) {
      return {
        message: 'Error en el servicio pvtBe.ecoComEconomicComplementsShow',
        error: true,
      };
    }
    return data;
  }

  async ecoComEconomicComplementsStore(authorization: string, data: any) {
    const response = await this.nats.firstValue(
      'pvtBe.ecoComEconomicComplementsStore',
      { authorization, data },
    );
    const { serviceStatus } = response;

    if (!serviceStatus) {
      return {
        message:
          'Error en el servicio pvtBe.ecoComEconomicComplementsStore, Complemento Económico ya fue registrado.',
        error: true,
      };
    }
    const { data: dataResponse } = response;
    return {
      name: dataResponse.filename,
      binaryPdf: dataResponse.content,
      serviceStatus: response.serviceStatus,
    };
  }

  async ecoComEconomicComplementsPrint(
    authorization: string,
    economicComplementId: number,
  ) {
    const response = await this.nats.firstValue(
      'pvtBe.ecoComEconomicComplementsPrint',
      { authorization, economicComplementId },
    );
    const { serviceStatus } = response;

    if (!serviceStatus) {
      return {
        message: 'Error en el servicio pvtBe.ecoComEconomicComplementsPrint',
        error: true,
      };
    }

    const { data: dataResponse } = response;
    return {
      name: dataResponse.filename,
      binaryPdf: dataResponse.content,
      serviceStatus: response.serviceStatus,
    };
  }

  async ecoComProcedure(authorization: string, ecoComProcedureId: number) {
    const data = await this.nats.firstValue('pvtBe.ecoComProcedure', {
      authorization,
      ecoComProcedureId,
    });

    if (!data.serviceStatus) {
      return {
        message: 'Error en el servicio pvtBe.ecoComProcedure',
        error: true,
      };
    }
    return data;
  }
}
