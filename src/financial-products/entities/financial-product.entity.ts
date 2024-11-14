import { BankEntity } from "src/banks/entities/bank.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./category.entity";

@Entity({ name: "financial_products" })
export class FinancialProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("decimal", { precision: 8, scale: 4 })
    interest_rate: number;

    @Column()
    image_url: string;

    @Column("decimal", { precision: 8, scale: 4 })
    cashback: number;

    @Column("text")
    benefits: string;

    @Column("text")
    insurances: string;

    @Column("text")
    requirements: string;

    @ManyToOne(
        () => BankEntity,
        (bank: BankEntity) => bank.financialProducts,
    {
        onDelete: 'CASCADE',
    })
    @JoinColumn({name: 'bank_id'})
    bank: BankEntity;

    @ManyToOne(
        () => CategoryEntity,
        (category: CategoryEntity) => category.financialProducts,
    {
        onDelete: 'CASCADE'
    }
    )
    @JoinColumn({name: 'category_id'})
    category: CategoryEntity;
    
}
