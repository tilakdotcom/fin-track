export interface ChartData {
  income: number;
  expenses: number;
}

export interface ExpenseEnumerable {
  _id: string;
  title: string;
  amount: number;
  createdAt: string;
  category: {
    _id: string;
    name: string;
    type: string;
  };
  type: string;
  color: string;
}

export interface IncomeEnumerable {
  _id: string;
  source: string;
  amount: number;
  createdAt: string;
  category: {
    _id: string;
    name: string;
    type: string;
  };
  type: string;
  color: string;
}

export interface CardProps {
  id: string;
  type: string;
  title: string;
  amount: number;
  date: string; // Format: YYYY-MM-DD
  category: {
    _id: string;
    name: string;
    type: string;
  };
}
