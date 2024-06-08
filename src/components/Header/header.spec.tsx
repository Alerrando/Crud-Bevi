import { QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "../../App";
import { deleteProductMock } from "../../api/mocks/delete-product-mock";
import { editProductMock } from "../../api/mocks/edit-product-mock";
import { getInfosProductsMock } from "../../api/mocks/get-infos-products-mock";
import { loginMock } from "../../api/mocks/login-mock";
import { registerProductMock } from "../../api/mocks/register-product-mock";
import { queryClient } from "../../lib/react-query";
import { Form } from "../../page/form";

test("should display the table values correctly", async () => {
  const worker = setupServer(loginMock, getInfosProductsMock, registerProductMock, deleteProductMock, editProductMock);
  await worker.listen();

  const { getByText } = render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>,
  );

  fireEvent.click(getByText("Adicionar"));

  await waitFor(
    () => {
      expect(global.window.location.pathname).toContain("/form");
    },
    { timeout: 2000 },
  );
});
