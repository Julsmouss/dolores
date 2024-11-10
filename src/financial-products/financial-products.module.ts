import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialProductsController } from './controllers/financial-products.controller';
import { FinancialProductsService } from './services/financial-products.service';
import { FinancialProductEntity } from './entities/financial-product.entity';
import { BankEntity } from 'src/banks/entities/bank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialProductEntity, BankEntity]),],
  controllers: [FinancialProductsController],
  providers: [FinancialProductsService]
})
export class FinancialProductsModule {}
