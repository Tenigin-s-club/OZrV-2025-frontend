import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, ModalOpened, uiStateName } from "./types";
import { uiInitialState } from "./constants";
import { User } from "./types";

const uiSlice = createSlice({
  name: uiStateName,
  initialState: uiInitialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<User | null>) {
      state.user = payload;
    },
    setMessages(state, { payload }: PayloadAction<Message[]>) {
      state.messages = payload;
    },
    setRequestStarted(state, { payload }: PayloadAction<string>) {
      state.requests[payload] = "pending";
    },
    setRequestFinished(state, { payload }: PayloadAction<string>) {
      state.requests[payload] = "fetched";
    },
    resetRequest(state, { payload }: PayloadAction<string>) {
      state.requests[payload] = "idle";
    },
    setModalOpened(state, { payload }: PayloadAction<ModalOpened>) {
      state.modalOpened = payload;
    },
    closeModal(state) {
      state.modalOpened = null;
    },
  },
});

export const { name, reducer, actions } = uiSlice;
