import { createSlice } from "@reduxjs/toolkit";

export interface IAuthReducerInitialState {
  loading: boolean;
  session?: IAuthReducerSession;
}

export interface IAuthReducerSession {
  user: {
    name: string;
    email?: string;
    phone?: string;
    username: string;
    created_at: Date;
    updated_at: Date;
  };
  payload: object;
  id: string;
  user_id: string;
}

const initialState: IAuthReducerInitialState = {
  loading: true,
  session: undefined,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSession: (state, action) => {
      state.session = action.payload;
    },
  },
});

export const { setLoading, setSession } = authSlice.actions;

export default authSlice.reducer;
