import { Module } from '@nestjs/common';
import { BanksController } from './banks/banks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanksService } from './banks/banks.service';
import { Bank } from './banks/entities/bank.entity';

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
  ],
  controllers: [BanksController],
  providers: [BanksService],
})
export class AppModule {}
