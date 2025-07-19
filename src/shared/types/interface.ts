import { Socket } from "socket.io-client";

export interface User {
  name: string;
  id: string;
}

export interface SystemMessage {
  content: string;
  type: "server";
}

export interface ChatMessage {
  content: string;
  type: "text" | "image";
  user: User;
  own?: boolean;
  timestamp: Date;
}

export interface Message {
  content: string;
  type: "text" | "image";
  user: User;
}

export interface ChatProps {
  chat: (ChatMessage | SystemMessage)[];
  user: User;
  typing: string[];
}

export interface InputsProps {
  user: User;
  socket: Socket;
  setChat: React.Dispatch<React.SetStateAction<(Message | SystemMessage)[]>>;
}

export interface SignUpProps {
  user: User;
  socket: Socket;
  input: string;
  setInput: (value: string) => void;
}
