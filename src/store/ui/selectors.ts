import { Chat } from "@/types";
import {
  Message,
  ModalOpened,
  RequestState,
  StoreWithUIState,
  UIState,
  uiStateName,
} from "./types";
import { User } from "./types";

const getState = (store: StoreWithUIState): UIState => store[uiStateName];

export const getUser = (s: StoreWithUIState): User | null => getState(s).user;

export const getMessages = (s: StoreWithUIState): Message[] =>
  getState(s).messages;

export const getModalOpened = (s: StoreWithUIState): ModalOpened =>
  getState(s).modalOpened;

export const getChatOpened = (s: StoreWithUIState): string | null =>
  getState(s).chatOpened;

export const getChats = (s: StoreWithUIState): Chat[] => getState(s).chats;

export const getRequests = (
  s: StoreWithUIState
): Record<string, RequestState> => getState(s).requests;
