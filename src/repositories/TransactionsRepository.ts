import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    let arIncome = 0;
    let arOutcome = 0;

    if (this.transactions.length > 0) {
      arIncome = this.transactions
        .map(transaction =>
          transaction.type === 'income' ? transaction.value : 0,
        )
        .reduce((acc, cur) => acc + cur);

      arOutcome = this.transactions
        .map(transaction =>
          transaction.type === 'outcome' ? transaction.value : 0,
        )
        .reduce((acc, cur) => acc + cur);
    }

    const total = arIncome - arOutcome;

    const balance = {
      income: arIncome,
      outcome: arOutcome,
      total,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
