import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FinancialProductEntity } from '../entities/financial-product.entity';
import { Repository } from 'typeorm';
import { BankEntity } from 'src/banks/entities/bank.entity';
import { CreateFinancialProductDto } from '../dto/create-financial-product-dto';

@Injectable()
export class FinancialProductsService {

    constructor(
        @InjectRepository(FinancialProductEntity)
        private readonly financialProductRepository: Repository<FinancialProductEntity>,
        
        @InjectRepository(BankEntity)
        private readonly bankRepository: Repository<BankEntity>,
    ) {}

    async getAll(): Promise<FinancialProductEntity[]> {
        return await this.financialProductRepository.find({
            relations: {
                bank: true,
            }
        });
    }

    async getById(idBank: number): Promise<FinancialProductEntity> {
        return await this.financialProductRepository.findOne({
            where: { id:idBank },
            relations: {
                bank: true,
            }
        });
    }

    async createFinancialProduct(newProduct: CreateFinancialProductDto): Promise<FinancialProductEntity> {
        const bankFound = await this.bankRepository.findOne({
            where: {id: newProduct.bank_id}
        })
        if(!bankFound){
            throw new Error('Bank not found in creation of financial product');
        }

        const financialProduct = new FinancialProductEntity();
        financialProduct.name = newProduct.name;
        financialProduct.interest_rate = newProduct.interest_rate;
        financialProduct.image_url = newProduct.image_url;
        financialProduct.cashback = newProduct.cashback;
        financialProduct.benefits = newProduct.benefits;
        financialProduct.insurances = newProduct.insurances;
        financialProduct.requirements = newProduct.requirements;
        financialProduct.bank = bankFound;
        
        return await this.financialProductRepository.save(financialProduct);
    }

    async updateFinancialProduct(idProduct: number, modifiedProduct: CreateFinancialProductDto): Promise<FinancialProductEntity> {
        const bankFound = await this.bankRepository.findOne({
            where: {id: modifiedProduct.bank_id}
        })
        if(!bankFound){
            throw new Error('Bank not found in update of financial product');
        }

        const productFound: FinancialProductEntity = await this.financialProductRepository.findOneBy({id:idProduct});
        productFound.name = modifiedProduct.name;
        productFound.interest_rate = modifiedProduct.interest_rate;
        productFound.image_url = modifiedProduct.image_url;
        productFound.cashback = modifiedProduct.cashback;
        productFound.benefits = modifiedProduct.benefits;
        productFound.insurances = modifiedProduct.insurances;
        productFound.requirements = modifiedProduct.requirements;
        productFound.bank = bankFound;
        
        return await this.financialProductRepository.save(productFound);
    }

    async deleteProduct(idProduct: number): Promise<any> {
        return await this.financialProductRepository.delete(idProduct);
    }

    async createFinancialProducts(newProducts: CreateFinancialProductDto[]): Promise<FinancialProductEntity[]> {
        const productsToSave: FinancialProductEntity[] = [];
    
        for (const newProduct of newProducts) {
            // Esperar a obtener el banco relacionado
            const bankFound = await this.bankRepository.findOne({
                where: { id: newProduct.bank_id }
            });
    
            // Verificar que el banco existe
            if (!bankFound) {
                throw new Error('Bank not found in creation of financial products');
            }
    
            // Crear y asignar valores al nuevo producto financiero
            const financialProduct = new FinancialProductEntity();
            financialProduct.name = newProduct.name;
            financialProduct.interest_rate = newProduct.interest_rate;
            financialProduct.image_url = newProduct.image_url;
            financialProduct.cashback = newProduct.cashback;
            financialProduct.benefits = newProduct.benefits;
            financialProduct.insurances = newProduct.insurances;
            financialProduct.requirements = newProduct.requirements;

            financialProduct.bank = bankFound;
    
            // Agregar el producto financiero a la lista
            productsToSave.push(financialProduct);
        }
    
        // Guardar todos los productos financieros en la base de datos
        return this.financialProductRepository.save(productsToSave);
    }    
    
    async deleteAll(): Promise<void> {
        await this.financialProductRepository.clear();
    }
}
