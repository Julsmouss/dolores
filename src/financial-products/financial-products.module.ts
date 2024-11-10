import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialProductsController } from './controllers/financial-products.controller';
import { FinancialProductsService } from './services/financial-products.service';
import { FinancialProductEntity } from './entities/financial-product.entity';
import { BankEntity } from 'src/banks/entities/bank.entity';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { CategoryEntity } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialProductEntity, BankEntity, CategoryEntity])],
  controllers: [FinancialProductsController, CategoriesController],
  providers: [FinancialProductsService, CategoriesService]
})
export class FinancialProductsModule {}
