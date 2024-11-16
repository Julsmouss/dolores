import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FinancialProductEntity } from "./financial-product.entity";

@Entity({name: 'categories'})
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(
        () => FinancialProductEntity,
        (financialProducts : FinancialProductEntity) => financialProducts.category
    )
    financialProducts: FinancialProductEntity[];
}
