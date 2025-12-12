export type SocketEvent<T = any> = {
  type: string;
  message: string;
  data: T;
};
