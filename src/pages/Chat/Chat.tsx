import { useState } from "react";
import { useChat, type UseChatOptions } from "@ai-sdk/react";

import { cn } from "@/lib/utils";

import { Chat } from "@/components/ui/chat";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { recordAudio } from "@/lib/audio-utils";
import { transcribeAudio } from "@/lib/transcribeAudio";

const MODELS = [
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

export function ChatBot(props: ChatDemoProps) {
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id);

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

  return (
    <div
      className={cn(
        "flex justify-between absolute z-[1000] bg-white p-8 text-[20px]",
        "flex-col",
        "h-full",
        "w-[60%] max-lg:w-[80%] max-md:w-[100%]"
      )}
    >
      <div className={cn("flex", "justify-end", "mb-2")}>
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent className="top-4">
            {MODELS.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
          "Привет, я хочу написать обращение",
          "Хочу сообщить о проблеме",
          "Посмотреть реестр домов",
          "Хочу ознакомиться со всеми домами на ФТ",
        ]}
      />
    </div>
  );
}
