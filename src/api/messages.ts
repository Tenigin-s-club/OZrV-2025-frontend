import { Message } from "@/store/ui/types";
import { request } from ".";
import { Chat } from "@/types";

export const requestMessages = async (chatId: string): Promise<Message[]> =>
  await request.get(`/chat/${chatId}`);

export const requestChats = async (): Promise<Chat[]> =>
  await request.get("/chat");
