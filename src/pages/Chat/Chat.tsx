import { useState } from "react";
import { useChat, type UseChatOptions } from "@ai-sdk/react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

import { Chat } from "@/components/ui/chat";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDispatch, useSelector } from "react-redux";
import { uiSelectors } from "@/store/ui";

import { transcribeAudio } from "@/lib/transcribeAudio";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../modules/AppSidebar/AppSidebar";
import { Chat as ChatType } from "@/types";

const LANGUAGES = [
  { id: "en", name: "English" },
  { id: "zh", name: "中文" },
  { id: "es", name: "Español" },
  { id: "hi", name: "हिन्दी" },
  { id: "ar", name: "العربية" },
  { id: "pt", name: "Português" },
  { id: "ru", name: "Русский" },
  { id: "ja", name: "日本語" },
  { id: "de", name: "Deutsch" },
  { id: "fr", name: "Français" },
];

type ChatDemoProps = {
  initialMessages?: UseChatOptions["initialMessages"];
};

const chats: ChatType[] = [
  {
    id: "123-ased-q23-23-wa",
    name: "test chat 1",
    createdAt: "2025-04-18T21:55:03Z",
  },
  {
    id: "123-a-fasdq3-4--wa",
    name: "test chat 2",
    createdAt: "2025-04-16T21:55:03Z",
  },
];

export function ChatBot(props: ChatDemoProps) {
  const [selectedModel, setSelectedModel] = useState(LANGUAGES[0].id);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    stop,
    isLoading,
    setMessages,
  } = useChat({
    ...props,
    api: "/api/chat",
    body: {
      model: selectedModel,
    },
  });

  const currentChatId = useSelector(uiSelectors.getChatOpened);

  const changeLanguage = (lng: string) => {
    console.log(lng);
    setSelectedModel(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <SidebarProvider
      style={{
        // @ts-ignore
        "--sidebar-width": "20rem",
        "--sidebar-width-mobile": "20rem",
      }}
    >
      <AppSidebar items={chats} />
      <div
        className={cn(
          "flex justify-between m-auto relative z-[1000] bg-white p-8 text-[20px]",
          "flex-col",
          "h-full",
          "w-[60%] max-lg:w-[80%] max-md:w-[100%]"
        )}
      >
        <div className={cn("flex", "justify-between", "mb-2", "w-full")}>
          <SidebarTrigger />
          <div className={cn("flex", "justify-end", "mb-2")}>
            <Select value={selectedModel} onValueChange={changeLanguage}>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent className="top-4">
                {LANGUAGES.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Chat
          className="grow"
          messages={messages}
          handleSubmit={handleSubmit}
          input={input}
          handleInputChange={handleInputChange}
          isGenerating={isLoading}
          stop={stop}
          append={append}
          setMessages={setMessages}
          transcribeAudio={transcribeAudio}
          suggestions={[
            t("suggestion1"),
            t("suggestion2"),
            t("suggestion3"),
            t("suggestion4"),
          ]}
        />
      </div>
    </SidebarProvider>
  );
}
