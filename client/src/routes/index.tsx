import { Entry } from "./Entry";
import RouteRender from "./RouteRender";

export const routes = [
  {
    path: "/",
    element: <Entry />,
  },
  {
    path: "customers",
    element: <RouteRender />,
  },
  {
    path: "upload",
    element: <RouteRender />,
  },
];
