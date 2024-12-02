export interface ChartData {
  income: number
  expenses: number
}

export interface ExpenseEnumerable{
  title: string;
  amount: number;
  createdAt: string;
  category: string;
  type: string;
  color: string;
}

export interface IncomeEnumerable {
  source: string;
  amount: number;
  createdAt: string;
  category: string;
  type: string;
  color: string;
}