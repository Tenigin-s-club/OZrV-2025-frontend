export type Chat = {
  id: string;
  name: string;
  createdAt: string;
};

export type Answer = {
  chat_id: string;
  human_message_id: string;
  chat_message_id: string;
  message: string;
};

export type MessageServ = {
  content: string;
  created_at: string;
  id: string;
  is_human: boolean;
};
