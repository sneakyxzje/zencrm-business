import { Client } from "@stomp/stompjs";
import React, { createContext, useContext, useEffect, useState } from "react";

const SOCKET_URL = "http://localhost:8080/ws";

const WebSocketContext = createContext<{
  client: Client | null;
  isConnected: boolean;
}>(null!);

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [client, setClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: SOCKET_URL,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Socket Connected Successfully!");
        setIsConnected(true);
      },
      onDisconnect: () => {
        console.log("Socket Disconnected");
        setIsConnected(false);
      },
      onStompError: (e) => {
        console.log("Error when connect stomp", e);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate;
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ client, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketClient = () => useContext(WebSocketContext);
