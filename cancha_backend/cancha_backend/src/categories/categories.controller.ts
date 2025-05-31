import { Controller, Get, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Category>> {
    limit = limit > 100 ? 100 : limit;
    return this.categoriesService.findAll({ page, limit });
  }
}