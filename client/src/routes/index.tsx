import LoginView from "../pages/Auth/LoginView";
import { Entry } from "./Entry";

export const routes = [
  {
    path: "/",
    element: <Entry />,
  },
  {
    path: "/login",
    element: <LoginView />,
  },
];
