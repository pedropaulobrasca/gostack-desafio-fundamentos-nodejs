import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionData {
  title: string;
  value: number;
  type: "income" | "outcome";
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce((balance: Balance, transaction: Transaction) => {
      if (transaction.type == "income") {
        balance.income += transaction.value;
      } else if (transaction.type == "outcome") {
        balance.outcome += transaction.value;
      }
      balance.total = balance.income - balance.outcome;
      return balance;
    }, {
      income: 0,
      outcome: 0,
      total: 0
    })
    return balance;
  }

  public create({ title, value, type }: TransactionData): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type
    });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
