import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from './banks/entities/bank.entity';
import { FinancialProductsModule } from './financial-products/financial-products.module';
import { BanksModule } from './banks/banks.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Bank]),
    FinancialProductsModule,
    BanksModule,
  ]
})
export class AppModule {}
