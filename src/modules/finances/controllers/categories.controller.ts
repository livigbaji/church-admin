import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CategoriesService } from '../services/categories.service';
import {
  CategoryDetails,
  CategoryList,
  NewCategoryDTO,
} from '../dtos/category.dto';
import { Category } from '../models/category.model';

@ApiTags('Finances')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('/')
  @ApiCreatedResponse({
    type: Category,
  })
  @ApiOperation({
    summary: 'Create new category for finance record tracking',
  })
  create(@Body() category: NewCategoryDTO) {
    return this.categoriesService.create(category, 'todo');
  }

  @Get('/')
  @ApiQuery({
    name: 'search',
    required: false,
  })
  @ApiOperation({
    summary: 'Get available categories',
  })
  @ApiOkResponse({
    type: CategoryList,
  })
  get(@Query('search') search: string) {
    return this.categoriesService.list(search);
  }

  @Get('/:category')
  @ApiOkResponse({
    type: CategoryDetails,
  })
  @ApiOperation({
    summary: 'Get category details and transactions',
  })
  getOne(@Param('category') category: string) {
    return this.categoriesService.transactions(category);
  }

  @Delete('/:category')
  @ApiOkResponse({
    type: Category,
  })
  @ApiOperation({
    summary: 'Delete category as long as it has no transactions',
  })
  delete(@Param('category') category: string) {
    return this.categoriesService.delete(category);
  }

  @Put('/:category')
  @ApiOkResponse({
    type: Category,
  })
  @ApiOperation({
    summary: 'Update category details',
  })
  update(@Param('category') category: string, @Body() updates: NewCategoryDTO) {
    return this.categoriesService.update(category, updates);
  }
}
