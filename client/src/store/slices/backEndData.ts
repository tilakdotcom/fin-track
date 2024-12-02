import { createSlice } from "@reduxjs/toolkit";

interface ExpenseType {
  color: string;
  _id: string;
  userId:string;
  categoryId: string;
  title: string;
  amount: number;
  createdAt: Date;
}

interface IncomeType {
  color: string;
  _id: string;
  userId:string;
  categoryId: string;
  source: string;
  amount: number;
  createdAt: Date;
}

interface dataState {
  expense : ExpenseType[] | undefined;
  income : IncomeType[] | undefined;
  loading: boolean;
  error: boolean;
}

const initialState: dataState = {
  expense: undefined,
  income: undefined,
  loading: false,
  error: false,
};


export const dataState = createSlice({
  name: "backend_graph_data",
  initialState,
  reducers: {
    fetchingStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchingSuccess: (state, action) => {
      state.expense = action.payload.expense;
      state.income = action.payload.income;
      state.loading = false;
      state.error = false;
    },
    clearData: (state) => {
      state.expense = undefined;
      state.income = undefined;
      state.loading = false;
      state.error = false;
    },
    fetchingFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchingStart, fetchingSuccess, clearData, fetchingFailure } =
dataState.actions;

export default dataState.reducer;
