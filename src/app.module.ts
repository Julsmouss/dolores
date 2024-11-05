import { Module } from '@nestjs/common';
import { BanksController } from './banks/banks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanksService } from './banks/banks.service';
import { Bank } from './banks/entities/bank.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nest',
      password: 'app',
      database: 'doloresapp_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Bank]),
  ],
  controllers: [BanksController],
  providers: [BanksService],
})
export class AppModule {}
