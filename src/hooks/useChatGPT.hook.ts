import { useEffect, useState } from "react";
import axios from "axios";

interface IMessage {
  role: string;
  content: string;
}

interface IChatGPTResponse {
  choices: { message: IMessage }[];
}

const MOCKED_MESSAGES = [
  {
    content: "Hello how can i help you?",
    role: "system",
  },
  {
    content: "Hey wassup ",
    role: "user",
  },
  {
    content: "Hey wasssup",
    role: "system",
  },
  {
    content: "Hey wassup",
    role: "user",
  },
];

const TEST_ENVIRONMENT = false;

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const useChatGPT = () => {
  console.log(API_KEY);
  const [messages, setMessages] = useState<IMessage[]>(() => {
    const savedMessages = localStorage.getItem("chatMessages");

    return TEST_ENVIRONMENT
      ? MOCKED_MESSAGES
      : savedMessages
      ? JSON.parse(savedMessages)
      : [];
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiService = axios.create({
    baseURL: "https://api.openai.com/v1",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  const clearErrors = (): void => {
    setError(null);
  };

  const clearCache = (): void => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    setMessages([]);
    clearErrors();
  };

  const sendMessage = async (content: string) => {
    const userMessage: IMessage = { role: "user", content };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.post<IChatGPTResponse>(
        "/chat/completions",
        {
          model: "gpt-3.5-turbo-16k",
          messages: [...messages, userMessage],
        }
      );
      const botMessage = response.data.choices[0].message;
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Sorry, try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  return { messages, sendMessage, loading, error, clearCache, clearErrors };
};

export default useChatGPT;
