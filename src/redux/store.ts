import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import chatsReducer from "./reducers/chatsReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chats: chatsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
