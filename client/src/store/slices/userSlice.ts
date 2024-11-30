import { createSlice } from '@reduxjs/toolkit'


interface userState {
  currentUser: null;
  loading: boolean;
  error: boolean;
}

const initialState: userState ={
  currentUser : null,
  loading:false,
  error:false,
}

export const userSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    loginStart : (state)=>{
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state,action)=>{
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    logout:(state)=>{
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    loginFailure : (state)=>{
      state.loading = false;
      state.error = true;
    }
  }
})


export const { loginStart, loginSuccess, logout, loginFailure } = userSlice.actions;

export default userSlice.reducer;