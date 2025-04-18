export const uiStateName = "ui";

export type RequestState = "idle" | "pending" | "fetched";

export type User = {
  id: string;
  fio: string;
  email: string;
};

export type Message = {
  id: string;
  content: string;
  role: "user" | "asistant";
  createdAt: Date;
};

export type ModalOpened = "register" | "login" | null;

export type UIState = {
  user: User | null;
  requests: Record<string, RequestState>;
  messages: Message[];
  modalOpened: ModalOpened;
};

export type StoreWithUIState = {
  [uiStateName]: UIState;
};
