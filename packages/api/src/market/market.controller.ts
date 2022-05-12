import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateMarketDTO } from './dto/market.dto';

import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
  constructor(private marketService: MarketService) {}

  @Post('/create')
  async createMarket(@Res() res, @Body() createMarketDTO: CreateMarketDTO) {
    const newMarket = await this.marketService.createMarket(createMarketDTO);

    return res.status(HttpStatus.OK).json({
      message: 'Created!',
      success: true,
      market: newMarket,
    });
  }

  @Get('/')
  async getMarkets(@Res() res) {
    const markets = await this.marketService.getMarkets();

    if (!markets) {
      throw new NotFoundException('Markets not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Markets fetched!',
      success: true,
      markets,
    });
  }

  @Get('/:id')
  async getMarket(@Res() res, @Param('id') id: string) {
    const market = await this.marketService.getMarket(id);

    if (!market) {
      throw new NotFoundException('Market not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Market fetched!',
      success: true,
      market,
    });
  }

  @Delete('/:id')
  async deleteMarket(@Res() res, @Param('id') id: string) {
    const market = await this.marketService.deleteMarket(id);

    if (!market) {
      throw new NotFoundException('Market not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Market deleted!',
      success: true,
      market,
    });
  }

  @Put('/:id')
  async updateMarket(
    @Res() res,
    @Param('id') id: string,
    @Body() createMarketDTO: CreateMarketDTO,
  ) {
    const updatedMarket = await this.marketService.updateMaket(
      id,
      createMarketDTO,
    );

    if (!updatedMarket) {
      throw new NotFoundException('Market not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Market updated!',
      success: true,
      market: updatedMarket,
    });
  }
}
