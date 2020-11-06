import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionData {
  title: string;
  value: number;
  type: "income" | "outcome";
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionData): Transaction {
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    });

    const balance = this.transactionsRepository.getBalance();

    if (type == "outcome" && balance.total < value) {
      throw new Error("insufficient balance.");
    }

    return transaction;
  }
}

export default CreateTransactionService;
