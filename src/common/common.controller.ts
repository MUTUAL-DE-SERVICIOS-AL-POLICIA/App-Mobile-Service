import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RecordService } from 'src/common/records';

@Controller()
export class CommonController {
  constructor(private readonly recordService: RecordService) {}

  @MessagePattern('appMobile.record.create')
  create(
    @Payload('action') action: string,
    @Payload('description') description: string,
    @Payload('metadata') metadata: any,
  ) {
    return this.recordService.create(action, description, metadata);
  }
}
