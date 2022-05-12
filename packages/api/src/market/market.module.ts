import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MarketController } from './market.controller';
import { MarketService } from './market.service';
import { MarketSchema } from './schema/market.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Market', schema: MarketSchema }]),
  ],
  controllers: [MarketController],
  providers: [MarketService],
})
export class MarketModule {}
