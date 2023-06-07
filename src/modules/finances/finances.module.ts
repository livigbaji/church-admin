import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { Transaction, TransactionSchema } from './models/transaction.model';
import { Category, CategorySchema } from './models/category.model';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsService } from './services/transactions.service';
import { CategoriesService } from './services/categories.service';
import { TransactionsController } from './controllers/transactions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [TransactionsService, CategoriesService],
  controllers: [CategoriesController, TransactionsController],
})
export class FinancesModule {}
