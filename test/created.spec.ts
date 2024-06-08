import { expect, test } from "@playwright/test";

test("should verify is the register product functionality  is right", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Adicionar" }).click();

  await page.waitForTimeout(1000);

  await page.locator('input[name="name"]').fill("Produto7");
  await page.locator('input[name="description"]').fill("Descrição do produto 7");
  await page.locator('input[name="price"]').fill("50");
  await page.locator('input[name="stock_quantity"]').fill("50");
  await page.getByRole("button", { name: "Cadastrar" }).click();

  await page.waitForTimeout(1000);

  expect(page.getByText("Produto7")).toBeVisible();
});
