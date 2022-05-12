import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';
import { MarketModule } from './market/market.module';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:zhCRVlAycw4KgE4U@eskuer.p9wbo.mongodb.net/eskuer?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
      },
    ),
    MarketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
