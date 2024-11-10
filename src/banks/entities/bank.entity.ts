import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FinancialProductEntity } from "src/financial-products/entities/financial-product.entity";

@Entity({name: 'banks'})
export class BankEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    contact_number: string;

    @Column()
    branches: string;

    @Column()
    link: string;

    @Column()
    email: string;

    @OneToMany(
        () => FinancialProductEntity,
        (financialProducts : FinancialProductEntity) => financialProducts.bank
    )
    financialProducts: FinancialProductEntity[];
}