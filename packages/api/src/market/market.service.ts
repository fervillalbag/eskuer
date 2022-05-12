import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateMarketDTO } from './dto/market.dto';
import { MarketInterface } from './interfaces/market.interface';

@Injectable()
export class MarketService {
  constructor(
    @InjectModel('Market')
    private readonly marketModel: Model<MarketInterface>,
  ) {}

  async createMarket(
    createMarketDTO: CreateMarketDTO,
  ): Promise<MarketInterface> {
    const createdMarket = new this.marketModel(createMarketDTO);
    return await createdMarket.save();
  }

  async getMarkets(): Promise<MarketInterface[]> {
    const markets = await this.marketModel.find();
    return markets;
  }

  async getMarket(id: string): Promise<MarketInterface> {
    const market = await this.marketModel.findById(id);
    return market;
  }

  async deleteMarket(id: string): Promise<MarketInterface> {
    const market = await this.marketModel.findByIdAndRemove(id);
    return market;
  }

  async updateMaket(
    id: string,
    createMarketDTO: CreateMarketDTO,
  ): Promise<MarketInterface> {
    const updatedMarket = await this.marketModel.findByIdAndUpdate(
      id,
      createMarketDTO,
      { new: true },
    );
    return updatedMarket;
  }
}
