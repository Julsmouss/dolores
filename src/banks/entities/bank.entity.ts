import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bank {

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
}