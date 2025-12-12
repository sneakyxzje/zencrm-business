import { useWebSocketClient } from "@app/provider/SocketProvider";
import { useEffect } from "react";

export const useSubscription = (
  topic: string,
  onMessage: (msg: any) => void
) => {
  const { client, isConnected } = useWebSocketClient();

  useEffect(() => {
    if (!isConnected || !client) return;

    console.log(`Subscribe to channel ${topic}`);

    const subscription = client.subscribe(topic, (message) => {
      if (message.body) {
        const parseBody = JSON.parse(message.body);
        onMessage(parseBody);
      }
    });

    return () => {
      console.log(`Unsubscribing from ${topic}`);
      subscription.unsubscribe();
    };
  }, [client, isConnected, topic, onMessage]);
};
