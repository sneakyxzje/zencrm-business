import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { ErrorPage } from "./pages/Error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
