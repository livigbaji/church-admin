import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '../models/category.model';
import { Transaction, TransactionDocument } from '../models/transaction.model';
import { Model } from 'mongoose';
import { NewTransactionDTO, TransferDTO } from '../dtos/transaction.dto';
import { TransactionType } from 'backend/src/types/transaction.types';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  categoryExists(category: string) {
    return this.categoryModel
      .findOne(
        {
          _id: category,
        },
        {
          balance: 1,
        },
      )
      .exec();
  }

  increaseCategoryBalance(category: string, amount: number) {
    return this.categoryModel.findOneAndUpdate(
      {
        _id: category,
      },
      {
        $inc: { balance: amount },
      },
    );
  }

  decreaseCategoryBalance(category: string, amount: number) {
    return this.categoryModel.findOneAndUpdate(
      {
        _id: category,
      },
      {
        $inc: { balance: -1 * amount },
      },
    );
  }

  async debit(transaction: NewTransactionDTO, createdBy: string) {
    const category = await this.categoryExists(transaction.category);

    if (!category) {
      throw new BadRequestException('Withdrawing into unknown category');
    }

    if (category.balance < transaction.amount) {
      throw new BadRequestException('Insufficient balance');
    }

    const entry = this.transactionModel.create({
      ...transaction,
      txType: TransactionType.DEBIT,
      createdBy,
    });
    const { balance } = await this.decreaseCategoryBalance(
      transaction.category,
      transaction.amount,
    );

    return {
      balance,
      transaction: entry,
    };
  }

  async credit(transaction: NewTransactionDTO, createdBy: string) {
    const category = await this.categoryExists(transaction.category);

    if (!category) {
      throw new BadRequestException('Paying into unknown category');
    }

    const entry = this.transactionModel.create({
      ...transaction,
      txType: TransactionType.CREDIT,
      createdBy,
    });
    const { balance } = await this.increaseCategoryBalance(
      transaction.category,
      transaction.amount,
    );

    return {
      balance,
      transaction: entry,
    };
  }

  async transfer(transaction: TransferDTO, createdBy: string) {
    const { categoryFrom, categoryTo, amount, description } = transaction;

    const debitCategory = await this.categoryExists(categoryFrom).then(
      (result) => {
        if (!result) {
          throw new BadRequestException('Withdrawing into unknown category');
        }
        return result;
      },
    );

    if (debitCategory.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    await await this.categoryExists(categoryTo).then((result) => {
      if (!result) {
        throw new BadRequestException('Paying into unknown category');
      }
      return result;
    });

    const transactions = await this.transactionModel.create([
      {
        amount,
        description,
        category: categoryTo,
        txType: TransactionType.CREDIT,
        createdBy,
      },
      {
        amount,
        description,
        category: categoryFrom,
        txType: TransactionType.DEBIT,
        createdBy,
      },
    ]);

    const { balance } = await this.decreaseCategoryBalance(
      categoryFrom,
      amount,
    );
    await this.increaseCategoryBalance(categoryTo, amount);

    return {
      balance,
      transactions,
    };
  }
}
