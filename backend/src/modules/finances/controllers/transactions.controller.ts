import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TransactionsService } from '../services/transactions.service';
import {
  CompleteTransaction,
  CompleteTransfer,
  NewTransactionDTO,
  TransferDTO,
} from '../dtos/transaction.dto';

@ApiTags('Finances')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionSerivce: TransactionsService) {}

  @Post('/:txType(credit|debit)')
  @ApiOperation({
    summary: 'Perform Deposit or withdrawal from category',
  })
  @ApiParam({
    type: String,
    enum: ['credit', 'debit'],
    name: 'txType',
    required: true,
  })
  @ApiCreatedResponse({
    type: CompleteTransaction,
  })
  creditOrDebit(
    @Param('txType') txType: 'credit' | 'debit',
    @Body() transaction: NewTransactionDTO,
  ) {
    // TODO add admin session decorator;
    const createdBy = 'todo';
    return txType == 'credit'
      ? this.transactionSerivce.credit(transaction, createdBy)
      : this.transactionSerivce.debit(transaction, createdBy);
  }

  @Post('/transfer')
  @ApiOperation({
    summary: 'Perform Deposit or withdrawal from category',
  })
  @ApiCreatedResponse({
    type: CompleteTransfer,
  })
  transfer(@Body() transaction: TransferDTO) {
    // TODO add admin session decorator;
    const createdBy = 'todo';
    return this.transactionSerivce.transfer(transaction, createdBy);
  }
}
