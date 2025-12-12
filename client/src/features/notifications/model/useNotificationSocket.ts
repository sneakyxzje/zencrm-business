import { useEffect } from "react";
import { useToast } from "@app/provider/ToastContext";
import { useAuth } from "@processes/auth/models/useAuth";
import { useWebSocketClient } from "@app/provider/SocketProvider";

export const useNotificationSocket = () => {
  const { user } = useAuth();
  const { client, isConnected } = useWebSocketClient();
  const { addToast } = useToast();
  let rolesToSubscribe: string[] = [];

  if (Array.isArray(user?.role)) {
    rolesToSubscribe = user.role;
  } else if (typeof user?.role === "string") {
    rolesToSubscribe = [user.role];
  }
  useEffect(() => {
    if (!isConnected || !client || !user?.role) return;
    if (!client.connected) {
      return;
    }
    const subscriptions: any[] = [];

    rolesToSubscribe.forEach((role) => {
      const topic = `/topic/roles/${role}`;

      const sub = client.subscribe(topic, (message) => {
        if (message.body) {
          const data = JSON.parse(message.body);

          addToast({
            type: "info",
            title: data.title || "Thông báo mới",
            message: data.message,
            persistent: false,
            duration: 4000,
          });
        }
      });
      subscriptions.push(sub);
    });

    return () => {
      subscriptions.forEach((sub) => sub.unsubscribe());
    };
  }, [client, isConnected, user, addToast]);
};
