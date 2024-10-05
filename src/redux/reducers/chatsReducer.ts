import { createSlice } from "@reduxjs/toolkit";

export interface IChat {
  id: string;
  content: string;
  message_type: "TEXT" | "VIDEO" | "GIF" | "IMAGE";
}

export interface IChatsReducerInitialState {
  selectedChatId?: string;
  selectedChatLoading: boolean;
  selectedChatMessages: IChat[];
}

const initialState: IChatsReducerInitialState = {
  selectedChatLoading: false,
  selectedChatMessages: [],
};

const chatsSlice = createSlice({
  initialState,
  name: "chats",
  reducers: {
    setSelectedChatId: (state, action) => {
      state.selectedChatId = action.payload;
    },
  },
});

export const { setSelectedChatId } = chatsSlice.actions;

export default chatsSlice.reducer;
