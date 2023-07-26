import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category, CategoryDocument } from '../models/category.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewCategoryDTO } from '../dtos/category.dto';
import { Transaction, TransactionDocument } from '../models/transaction.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  create(category: NewCategoryDTO, createdBy: string) {
    return this.categoryModel.create({
      ...category,
      createdBy,
    });
  }

  async list(name?: string) {
    return {
      data: await this.categoryModel.find({
        ...(name && {
          name: { $regexp: name, $options: 'ig' },
        }),
      }),
    };
  }

  async transactions(id: string, skip = 0, limit = 1000) {
    // TODO populdate names
    return {
      category: await this.categoryModel.findById(id).then((result) => {
        if (!result) {
          throw new NotFoundException('Category not found');
        }
        return result;
      }),
      transactions: await this.transactionModel
        .find({
          category: id,
        })
        .skip(Number(skip) || 0)
        .limit(Number(limit) || 1000)
        .sort({ createdAt: -1 }),
    };
  }

  update(id: string, category: NewCategoryDTO) {
    return this.categoryModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: category,
      },
      {
        new: true,
      },
    );
  }

  async delete(id: string) {
    const hasTransactions = await this.transactionModel.exists({
      category: id,
    });

    if (hasTransactions) {
      throw new BadRequestException('Category has transactions');
    }

    return this.transactionModel.findOneAndDelete({
      _id: id,
    });
  }
}
