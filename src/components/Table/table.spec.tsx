import { QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "../../lib/react-query";
import { App } from "../../App";

test("should display the table values correctly", async () => {
  const { getByText } = render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>,
  );

  await waitFor(
    () => {
      expect(getByText("Produto1")).toBeInTheDocument();
      expect(getByText("Produto2")).toBeInTheDocument();
      expect(getByText("Produto3")).toBeInTheDocument();
      expect(getByText("Produto4")).toBeInTheDocument();
    },
    { timeout: 2000 },
  );
});
