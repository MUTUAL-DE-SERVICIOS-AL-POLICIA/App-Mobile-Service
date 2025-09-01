import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NATS_SERVICE, NastEnvs } from 'src/config';
import { NatsService } from './nats/nats.service';
import { RecordService, Record } from './records';
import { CommonController } from './common.controller';

@Global()
@Module({
  controllers: [CommonController],
  imports: [
    ClientsModule.register([
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: NastEnvs.natsServers,
        },
      },
    ]),
    TypeOrmModule.forFeature([Record]),
  ],
  providers: [NatsService, RecordService],
  exports: [
    ClientsModule.register([
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: NastEnvs.natsServers,
        },
      },
    ]),
    NatsService,
    RecordService
  ],
})
export class CommonModule {}
