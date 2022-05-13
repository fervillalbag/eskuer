import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePriceDTO } from './dto/price.dto';

import { PriceInterface } from './interfaces/price.interface';

@Injectable()
export class PriceService {
  constructor(
    @InjectModel('Price') private readonly priceModel: Model<PriceInterface>,
  ) {}

  async createPrice(createPriceDTO: CreatePriceDTO): Promise<PriceInterface> {
    const newPrice = new this.priceModel(createPriceDTO);
    return await newPrice.save();
  }

  async getPrices(): Promise<PriceInterface[]> {
    const prices = await this.priceModel.find();
    return prices;
  }

  async getPrice(id: string): Promise<PriceInterface> {
    const price = await this.priceModel.findById(id);
    return price;
  }

  async updatePrice(
    id: string,
    createPriceDTO: CreatePriceDTO,
  ): Promise<PriceInterface> {
    const newPrice = await this.priceModel.findByIdAndUpdate(
      id,
      createPriceDTO,
      { new: true },
    );
    return newPrice;
  }

  async deletePrice(id: string): Promise<PriceInterface> {
    const priceDeleted = await this.priceModel.findByIdAndDelete(id);
    return priceDeleted;
  }
}
