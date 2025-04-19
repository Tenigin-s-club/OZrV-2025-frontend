import { Chat } from "@/types";
import {
  Event,
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

export const getEvents = (s: StoreWithUIState): Event[] => getState(s).events;

export const getCurrentEvent = (s: StoreWithUIState): Event | null =>
  getState(s).currentEvent;

export const getRequests = (
  s: StoreWithUIState
): Record<string, RequestState> => getState(s).requests;
