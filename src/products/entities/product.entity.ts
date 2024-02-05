import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'products' })
export class Product {
    @ApiProperty({
        example: '079a891d-237b-4fc7-8581-d26472a2045e',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'Genuine Shirt',
        description: 'Products title',
        uniqueItems: true
    })
    @Column('text', { unique: true, })
    title: string;

    @ApiProperty({
        example: 2.0,
        description: 'Products price',
    })
    @Column('float', { default: 0 })
    price: number;

    @ApiProperty({
        example: 'This is a beautiful shirt',
        description: 'Products description',
        default: null
    })
    @Column({ type: 'text', nullable: true })
    description: string;

    @ApiProperty({
        example: 'genuine_shirt',
        description: 'Products slug(link) for SEO',
        uniqueItems: true
    })
    @Column('text', { unique: true })
    slug: string

    @ApiProperty({
        example: 2,
        description: 'Products stock',
    })
    @Column('int', { default: 0 })
    stock: number;

    @ApiProperty({
        example: ['S', 'M', 'L'],
        description: 'Products sizes',
    })
    @Column('text', { array: true })
    sizes: string[]

    @ApiProperty({
        example: ['men', 'women', 'kid', 'unisex'],
        description: 'Products gender',
    })
    @Column('text')
    gender: string;

    @ApiProperty({
        example: ['blue', 'oversize'],
        description: 'Products tags',
    })
    @Column('text', { array: true, default: [] })
    tags: string[];

    @ApiProperty({
        example: 'http://image_1',
        description: 'Products images',
        uniqueItems: true
    })
    @OneToMany(() => ProductImage, productImage => productImage.product, { cascade: true, eager: true })
    images?: ProductImage[]

    @ManyToOne(() => User, (user) => user.product, { eager: true })
    user: User

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title.toLocaleLowerCase().replaceAll(' ', '_').replaceAll("'", '')
        }
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.title.toLocaleLowerCase().replaceAll(' ', '_').replaceAll("'", '')
    }
}
