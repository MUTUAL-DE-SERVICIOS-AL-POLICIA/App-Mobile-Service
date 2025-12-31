import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RetirementFundAverage } from './entities/retirement_fund_averages.entity';

@Injectable()
export class RetirementFundAveragesService {
  private readonly logger = new Logger(RetirementFundAveragesService.name);

  constructor(
    @InjectRepository(RetirementFundAverage)
    private readonly retirementFundAverageRepository: Repository<RetirementFundAverage>,
  ) {}

  /**
   * Obtiene todos los promedios de fondo de retiro activos
   */
  async findAll(): Promise<{ data: RetirementFundAverage[]; serviceStatus: boolean }> {
    try {
      const averages = await this.retirementFundAverageRepository.find({
        where: { isActive: true },
        order: { id: 'ASC' }
      });

      this.logger.debug(`Encontrados ${averages.length} promedios de fondo de retiro activos`);
      
      return {
        data: averages,
        serviceStatus: true
      };
    } catch (error) {
      this.logger.error(`Error al obtener promedios de fondo de retiro: ${error.message}`);
      return {
        data: [],
        serviceStatus: false
      };
    }
  }

  /**
   * Obtiene un promedio de fondo de retiro por ID
   */
  async findOne(id: number): Promise<{ data: RetirementFundAverage | null; serviceStatus: boolean }> {
    try {
      const average = await this.retirementFundAverageRepository.findOne({
        where: { id, isActive: true }
      });

      if (!average) {
        this.logger.debug(`No se encontró promedio de fondo de retiro con ID: ${id}`);
        return {
          data: null,
          serviceStatus: true
        };
      }

      return {
        data: average,
        serviceStatus: true
      };
    } catch (error) {
      this.logger.error(`Error al obtener promedio de fondo de retiro ${id}: ${error.message}`);
      return {
        data: null,
        serviceStatus: false
      };
    }
  }

  /**
   * Obtiene promedios de fondo de retiro por degree_id
   */
  async findByDegreeId(degreeId: number): Promise<{ data: RetirementFundAverage[]; serviceStatus: boolean }> {
    try {
      const averages = await this.retirementFundAverageRepository.find({
        where: { degreeId, isActive: true },
        order: { id: 'ASC' }
      });

      this.logger.debug(`Encontrados ${averages.length} promedios para degreeId: ${degreeId}`);
      
      return {
        data: averages,
        serviceStatus: true
      };
    } catch (error) {
      this.logger.error(`Error al obtener promedios por degreeId ${degreeId}: ${error.message}`);
      return {
        data: [],
        serviceStatus: false
      };
    }
  }

  /**
   * Obtiene promedios de fondo de retiro por category_id
   */
  async findByCategoryId(categoryId: number): Promise<{ data: RetirementFundAverage[]; serviceStatus: boolean }> {
    try {
      const averages = await this.retirementFundAverageRepository.find({
        where: { categoryId, isActive: true },
        order: { id: 'ASC' }
      });

      this.logger.debug(`Encontrados ${averages.length} promedios para categoryId: ${categoryId}`);
      
      return {
        data: averages,
        serviceStatus: true
      };
    } catch (error) {
      this.logger.error(`Error al obtener promedios por categoryId ${categoryId}: ${error.message}`);
      return {
        data: [],
        serviceStatus: false
      };
    }
  }

  /**
   * Obtiene promedio de fondo de retiro por degree_id y category_id
   */
  async findByDegreeAndCategory(degreeId: number, categoryId: number): Promise<{ data: RetirementFundAverage | null; serviceStatus: boolean }> {
    try {
      const average = await this.retirementFundAverageRepository.findOne({
        where: { degreeId, categoryId, isActive: true }
      });

      if (!average) {
        this.logger.debug(`No se encontró promedio para degreeId: ${degreeId}, categoryId: ${categoryId}`);
        return {
          data: null,
          serviceStatus: true
        };
      }

      return {
        data: average,
        serviceStatus: true
      };
    } catch (error) {
      this.logger.error(`Error al obtener promedio para degreeId ${degreeId}, categoryId ${categoryId}: ${error.message}`);
      return {
        data: null,
        serviceStatus: false
      };
    }
  }
}