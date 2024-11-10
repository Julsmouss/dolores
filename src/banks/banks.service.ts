import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from './entities/bank.entity';
import { CreateBankDto } from './dto/create-bank-dto/create-bank-dto';

@Injectable()
export class BanksService {

    constructor(
        @InjectRepository(Bank)
        private readonly bankRepository: Repository<Bank>,
    ) {}

    async getAll(): Promise<Bank[]> {
        return await this.bankRepository.find();
    }

    async getById(idBank: number): Promise<Bank> {
        return await this.bankRepository.findOneBy({id:idBank});
    }

    async createBank(newBank: CreateBankDto): Promise<Bank> {
        const newb = new Bank();
        newb.name = newBank.name;
        newb.contact_number = newBank.contact_number;
        newb.branches = newBank.branches;
        newb.link = newBank.link;
        newb.email = newBank.email;
        return this.bankRepository.save(newb);
    }

    async updateBank(idBank: number, oldBank: CreateBankDto): Promise<Bank> {
        const bankUpdate: Bank = await this.bankRepository.findOneBy({id:idBank});
        bankUpdate.name = oldBank.name;
        bankUpdate.contact_number = oldBank.contact_number;
        bankUpdate.branches = oldBank.branches;
        bankUpdate.link = oldBank.link;
        bankUpdate.email = oldBank.email;
        return this.bankRepository.save(bankUpdate);
    }

    async deleteBank(idBank: number): Promise<any> {
        return await this.bankRepository.delete(idBank);
    }

    async createBanks(newBanks: CreateBankDto[]): Promise<Bank[]> {
        const banksToSave = newBanks.map(newBank => {
            const bank = new Bank();
            bank.name = newBank.name;
            bank.contact_number = newBank.contact_number;
            bank.branches = newBank.branches;
            bank.link = newBank.link;
            bank.email = newBank.email;
            return bank;
        });
        return this.bankRepository.save(banksToSave);
    }
    
    async deleteBanks(): Promise<void> {
        await this.bankRepository.clear();
    }
    
}