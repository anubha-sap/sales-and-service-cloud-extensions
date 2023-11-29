import { Module } from '@nestjs/common';
import { RegisteredProductsService } from './registered-products.service';

@Module({
  providers: [RegisteredProductsService],
  exports: [RegisteredProductsService],
})
export class RegisteredProductsModule {}
