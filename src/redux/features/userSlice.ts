import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  _id: string,
  email: string,
  name: string,
  role:string,
  iat:number,
  exp: number
}

type TAuthState = {
  user: null | TUser,
  token: null | string,
  role: null | string,
}

const initialState : TAuthState = {
  user:null,
  token: null,
  role: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout:(state) =>{
      state.user = null;
      state.token = null;
    }
  },
});

export const { setToken, setUser,logout,setRole } = userSlice.actions;
export default userSlice.reducer;
