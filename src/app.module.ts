import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { AppMobileModule } from './app-mobile/app-mobile.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    CommonModule,
    AppMobileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
