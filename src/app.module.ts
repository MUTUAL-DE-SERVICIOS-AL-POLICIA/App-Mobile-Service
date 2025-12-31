import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { AppMobileModule } from './app-mobile/app-mobile.module';
import { PreEvaluationModule } from './pre-evalution/pre-evaluation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    CommonModule,
    AppMobileModule,
    PreEvaluationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
