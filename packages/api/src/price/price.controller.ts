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
import { CreatePriceDTO } from './dto/price.dto';
import { PriceInterface } from './interfaces/price.interface';
import { PriceService } from './price.service';

@Controller('price')
export class PriceController {
  constructor(private priceService: PriceService) {}

  @Post('/create')
  async createPrice(@Res() res, @Body() createPriceDTO: CreatePriceDTO) {
    const newPrice = await this.priceService.createPrice(createPriceDTO);

    if (!newPrice) {
      throw new NotFoundException('Price could not be created');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Created!',
      success: true,
      price: newPrice,
    });
  }

  @Get('/')
  async getPrices(@Res() res): Promise<PriceInterface[]> {
    const prices = await this.priceService.getPrices();

    if (!prices) {
      throw new NotFoundException('Prices could not be found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Here are your prices!',
      success: true,
      prices,
    });
  }

  @Get('/:id')
  async getPrice(@Res() res, @Param('id') id: string): Promise<PriceInterface> {
    const price = await this.priceService.getPrice(id);

    if (Object.keys(price).length === 0) {
      throw new NotFoundException('Price not found!');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Price fetched',
      success: true,
      price,
    });
  }

  @Put('/:id')
  async updatePrice(
    @Res() res,
    @Param('id') id: string,
    @Body() createPriceDTO: CreatePriceDTO,
  ): Promise<PriceInterface> {
    const newPrice = await this.priceService.updatePrice(id, createPriceDTO);

    if (!newPrice) {
      throw new Error('Price not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Updated!',
      success: true,
      price: newPrice,
    });
  }

  @Delete('/:id')
  async deletePrice(
    @Res() res,
    @Param('id') id: string,
  ): Promise<PriceInterface> {
    const priceDeleted = await this.priceService.deletePrice(id);

    if (!priceDeleted) {
      throw new Error('Price not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Deleted!',
      success: true,
      price: priceDeleted,
    });
  }
}
