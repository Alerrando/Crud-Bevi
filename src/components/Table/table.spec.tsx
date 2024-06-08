import { QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { App } from "../../App";
import { queryClient } from "../../lib/react-query";
import { setupServer } from "msw/node";
import { loginMock } from "../../api/mocks/login-mock";
import { getInfosProductsMock } from "../../api/mocks/get-infos-products-mock";
import { registerProductMock } from "../../api/mocks/register-product-mock";
import { deleteProductMock } from "../../api/mocks/delete-product-mock";
import { editProductMock } from "../../api/mocks/edit-product-mock";

test("should display the table values correctly", async () => {
  const worker = setupServer(loginMock, getInfosProductsMock, registerProductMock, deleteProductMock, editProductMock);
  await worker.listen();

  const { getAllByRole, getByText } = render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>,
  );

  await waitFor(
    () => {
      expect(getAllByRole("row")).toHaveLength(5);
      expect(getByText("Produto1")).toBeInTheDocument();
      expect(getByText("Produto2")).toBeInTheDocument();
      expect(getByText("Produto3")).toBeInTheDocument();
      expect(getByText("Produto4")).toBeInTheDocument();
    },
    { timeout: 2000 },
  );
});
