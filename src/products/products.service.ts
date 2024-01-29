import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';


@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService')

  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) { }

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto)
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.productRepository.find({ take: limit, skip: offset });
  }

  async findOne(term: string) {
    let product: Product;

    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term })
    }

    if (!product) {
      product = await this.productRepository.findOneBy({ slug: term })
    }
    const queryBuilder = this.productRepository.createQueryBuilder();
    product = await queryBuilder.where('title =:title or slug=:slug', { title: term, slug: term, }).getOne();
    // const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException(`Product with id ${term} not found`);
    return product
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    if (product) {
      await this.productRepository.remove(product);
    }
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error)
    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException("Unexpected error, check server logs!");
  }
}
