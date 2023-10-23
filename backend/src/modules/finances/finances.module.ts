import { Module, forwardRef } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { Transaction, TransactionSchema } from './models/transaction.model';
import { Category, CategorySchema } from './models/category.model';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsService } from './services/transactions.service';
import { CategoriesService } from './services/categories.service';
import { TransactionsController } from './controllers/transactions.controller';
import { MembersModule } from '../members/members.module';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
    forwardRef(() => MembersModule),
    forwardRef(() => AdminModule),
  ],
  providers: [TransactionsService, CategoriesService],
  controllers: [CategoriesController, TransactionsController],
})
export class FinancesModule {}
