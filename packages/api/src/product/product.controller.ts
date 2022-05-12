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
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create')
  async createProduct(@Res() res, @Body() createProduct: CreateProductDTO) {
    const newProduct = await this.productService.createProduct(createProduct);

    return res.status(HttpStatus.OK).json({
      message: 'Created!',
      success: true,
      newProduct,
    });
  }

  @Put('/:id')
  async updateProduct(
    @Res() res,
    @Param('id') id: string,
    @Body() updateProduct: CreateProductDTO,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      id,
      updateProduct,
    );

    if (!updatedProduct) {
      throw new NotFoundException('Product does not exist!');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Product updated!',
      success: true,
      updatedProduct,
    });
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();

    if (!products) {
      throw new NotFoundException('No products found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Products fetched!',
      success: true,
      products,
    });
  }

  @Get('/:id')
  async getProduct(@Res() res, @Param('id') id: string) {
    const product = await this.productService.getProduct(id);

    if (!product) {
      throw new NotFoundException('No product found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Product fetched!',
      success: true,
      product,
    });
  }

  @Delete('/:id')
  async deleteProduct(@Res() res, @Param('id') id: string) {
    const deletedProduct = await this.productService.deleteProduct(id);

    if (!deletedProduct) {
      throw new NotFoundException('No product found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Product deleted!',
      success: true,
      deletedProduct,
    });
  }
}
