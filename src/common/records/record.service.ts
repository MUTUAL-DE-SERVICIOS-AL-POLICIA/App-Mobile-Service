import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}

  async create(action: string, description?: string, metadata?: any): Promise<Record> {
    const record = this.recordRepository.create({ action, description, metadata });
    return await this.recordRepository.save(record);
  }

}
