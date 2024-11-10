import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanksController } from './controllers/banks.controller';
import { BanksService } from './services/banks.service';
import { BankEntity } from './entities/bank.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BankEntity]),],
    controllers: [BanksController],
    providers: [BanksService],
})
export class BanksModule {}
