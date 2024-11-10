import { BankEntity } from "src/banks/entities/bank.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "financial_products" })
export class FinancialProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    interest_rate: number;

    @Column()
    image_url: string;

    @Column()
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
        onDelete: "CASCADE",
    })
    @JoinColumn({name: 'bank_id'})
    bank: BankEntity;

    /*
    @Column()
    category_id: number;
    */
}
