import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO } from './dto/product.dto';

import { ProductInterface } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductInterface>,
  ) {}

  async createProduct(
    createProduct: CreateProductDTO,
  ): Promise<ProductInterface> {
    const createdProduct = new this.productModel(createProduct);
    return await createdProduct.save();
  }

  async getProducts(): Promise<ProductInterface[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getProduct(id: string): Promise<ProductInterface> {
    const product = await this.productModel.findById(id);
    return product;
  }

  async updateProduct(
    id: string,
    updateProduct: CreateProductDTO,
  ): Promise<ProductInterface> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProduct,
      { new: true },
    );
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<ProductInterface> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    return deletedProduct;
  }
}
