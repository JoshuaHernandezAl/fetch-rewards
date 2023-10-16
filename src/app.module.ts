import { Module } from '@nestjs/common';
import { ReceiptsModule } from './receipts/receipts.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ReceiptsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
