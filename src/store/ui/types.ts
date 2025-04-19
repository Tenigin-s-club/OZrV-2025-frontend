import { Chat } from "@/types";

export const uiStateName = "ui";

export type RequestState = "idle" | "pending" | "fetched";

export type User = {
  id: string;
  fio: string;
  email: string;
};

export type Message = {
  id: string;
  message: string;
  role: "user" | "asistant";
  createdAt: Date;
};

export type ModalOpened = "register" | "login" | "event" | null;

export type UIState = {
  user: User | null;
  requests: Record<string, RequestState>;
  messages: Message[];
  modalOpened: ModalOpened;
  chatOpened: string | null;
  chats: Chat[];
  events: Event[];
  currentEvent: Event | null;
};

export type StoreWithUIState = {
  [uiStateName]: UIState;
};

export type Event = {
  id: string;
  title: string;
  image_url: string;
  description: string;
  date_event: string;
};
