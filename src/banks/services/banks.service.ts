import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankEntity } from '../entities/bank.entity';
import { CreateBankDto } from '../dto/create-bank-dto';

@Injectable()
export class BanksService {

    constructor(
        @InjectRepository(BankEntity)
        private readonly bankRepository: Repository<BankEntity>,
    ) {}

    async getAll(): Promise<BankEntity[]> {
        return await this.bankRepository.find({
            relations: {
                financialProducts: true,
            }
        });
    }

    async getById(idBank: number): Promise<BankEntity> {
        return await this.bankRepository.findOne({
            where: {id: idBank},
            relations: {
                financialProducts: true,
            }
        });
    }

    async createBank(newBank: CreateBankDto): Promise<BankEntity> {
        const newb = new BankEntity();
        newb.name = newBank.name;
        newb.contact_number = newBank.contact_number;
        newb.branches = newBank.branches;
        newb.link = newBank.link;
        newb.email = newBank.email;
        return await this.bankRepository.save(newb);
    }

    async updateBank(idBank: number, modifiedBank: CreateBankDto): Promise<BankEntity> {
        const bankUpdate: BankEntity = await this.bankRepository.findOneBy({id:idBank});
        bankUpdate.name = modifiedBank.name;
        bankUpdate.contact_number = modifiedBank.contact_number;
        bankUpdate.branches = modifiedBank.branches;
        bankUpdate.link = modifiedBank.link;
        bankUpdate.email = modifiedBank.email;
        return await this.bankRepository.save(bankUpdate);
    }

    async deleteBank(idBank: number): Promise<any> {
        return await this.bankRepository.delete(idBank);
    }

    async createBanks(newBanks: CreateBankDto[]): Promise<BankEntity[]> {
        const banksToSave = newBanks.map(newBank => {
            const bank = new BankEntity();
            bank.name = newBank.name;
            bank.contact_number = newBank.contact_number;
            bank.branches = newBank.branches;
            bank.link = newBank.link;
            bank.email = newBank.email;
            return bank;
        });
        return await this.bankRepository.save(banksToSave);
    }
    
    async deleteAll(): Promise<any> {
        return await this.bankRepository.clear();
    }

}