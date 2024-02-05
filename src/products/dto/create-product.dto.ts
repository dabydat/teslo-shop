import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {
    @ApiProperty({
        description:'Products title',
        nullable: false
    })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({
        description:'Products price',
        nullable: true
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiProperty({
        description:'Products description',
        nullable: true
    })
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
        nullable: true
    })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty({
        nullable: true
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @ApiProperty({
        nullable: false
    })
    @IsString({ each: true })
    @IsArray()
    sizes: string[];

    @ApiProperty({
        nullable: false
    })
    @IsIn(['men', 'women', 'kid', 'unisex'])
    gender: string;

    @ApiProperty({
        nullable: true
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[];

    @ApiProperty({
        nullable: false
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];
}
