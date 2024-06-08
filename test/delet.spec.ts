import { expect, test } from "@playwright/test";

test("should verify is the delete product functionality  is right", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.getByRole("row", { name: "Produto3 Descrição do produto" }).getByRole("img").nth(1).click();

  await page.getByRole("button", { name: "Confirmar" }).click();

  expect(page.getByText("Produto deletado com sucesso!")).toBeVisible();
  await page.waitForTimeout(2000);
});
