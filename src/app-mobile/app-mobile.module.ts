import { Module } from '@nestjs/common';
import { AppMobileService } from './app-mobile.service';
import { AppMobileController } from './app-mobile.controller';
import { Token, Device } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Token, Device])],
  controllers: [AppMobileController],
  providers: [AppMobileService],
})
export class AppMobileModule {}
