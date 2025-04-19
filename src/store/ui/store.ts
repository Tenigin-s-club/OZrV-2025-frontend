import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, ModalOpened, uiStateName } from "./types";
import { uiInitialState } from "./constants";
import { User, Event } from "./types";
import { Chat } from "@/types";

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
    setEvents(state, { payload }: PayloadAction<Event[]>) {
      state.events = payload;
    },
    setCurrentEvent(state, { payload }: PayloadAction<Event | null>) {
      state.currentEvent = payload;
    },
    addMessage(state, { payload }: PayloadAction<Message>) {
      state.messages = [...state.messages, payload];
    },
    updateMessage(state, { payload }: PayloadAction<Message>) {
      state.messages = [
        ...state.messages.filter((el) => el.id !== "0"),
        payload,
      ];
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
    setChatOpened(state, { payload }: PayloadAction<string | null>) {
      state.chatOpened = payload;
    },
    setNewChat(state) {
      state.chatOpened = null;
    },
    setChats(state, { payload }: PayloadAction<Chat[]>) {
      state.chats = payload;
    },
    addChat(state, { payload }: PayloadAction<Chat>) {
      if (!state.chats.map((el) => el.id).includes(payload.id))
        state.chats = [...state.chats, payload];
    },
    closeModal(state) {
      state.modalOpened = null;
    },
  },
});

export const { name, reducer, actions } = uiSlice;
