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
import { Auth } from 'src/decorators/permissions.decorator';

@ApiTags('Finances')
@Controller('/api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('/')
  @ApiCreatedResponse({
    type: Category,
  })
  @ApiOperation({
    summary: 'Create new category for finance record tracking',
  })
  @Auth()
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
  @Auth()
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
  @Auth()
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
  @Auth()
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
  @Auth()
  update(@Param('category') category: string, @Body() updates: NewCategoryDTO) {
    return this.categoriesService.update(category, updates);
  }
}
