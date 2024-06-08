import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { Form } from "./page/form";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}
