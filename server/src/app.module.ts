import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { Client } from 'pg';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: Client,
      useValue: new Client(configService.getClientConfig()),
    },
  ],
})
export class AppModule {}
