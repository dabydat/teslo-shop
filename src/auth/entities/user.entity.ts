import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities';
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';

@Entity('users')
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ApiProperty()
    @Column('text', { unique: true, })
    email: string;
    @ApiProperty()
    @Column('text', { select: false })
    password: string;
    @ApiProperty()
    @Column('text')
    fullName: string;
    @ApiProperty()
    @Column('boolean', { default: true })
    isActive: boolean;
    @ApiProperty()
    @Column('text', { array: true, default: ['user'] })
    roles: string[];
    // @ApiProperty()
    @OneToMany(() => Product, (product) => product.user)
    product: Product

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLocaleLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}
