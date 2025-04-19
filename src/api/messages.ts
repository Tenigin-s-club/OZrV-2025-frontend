import { Message } from "@/store/ui/types";
import { request } from ".";
import { Answer, Chat } from "@/types";

export const requestMessages = async (chatId: string): Promise<Message[]> =>
  await request.get(`/chat/${chatId}`);

export const requestChats = async (): Promise<Chat[]> =>
  await request.get("/chat");

export const requestSendMessage = async (
  question: string,
  chatId: string | null = null
): Promise<Answer> => {
  if (chatId) return await request.post(`/question/${chatId}`, { question });
  return await request.post("/question", { question });
};
