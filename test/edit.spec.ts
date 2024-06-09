import { expect, test } from "@playwright/test";

test("should verify is the edit product functionality  is right", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.getByRole("row", { name: "Descrição do produto 3" }).getByRole("img").first().click();

  await page.locator('input[name="name"]').fill("Produto10");
  await page.locator('input[name="description"]').fill("Descrição do produto 10");
  await page.locator('input[name="price"]').fill("22");
  await page.locator('input[name="stock_quantity"]').fill("88");
  const locator = await page.getByRole("combobox");
  locator.selectOption(["3"]);

  await page.getByRole("button", { name: "Editar" }).click();

  expect(page.getByText("Produto editado com sucesso!")).toBeVisible();

  await page.waitForTimeout(2000);
});
