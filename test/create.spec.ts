import { expect, test } from "@playwright/test";
test.describe("Create", () => {
  test("should verify is the register product functionality  is right", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    await page.getByRole("link", { name: "Adicionar" }).click();

    await page.locator('input[name="name"]').fill("Produto8");
    await page.locator('input[name="description"]').fill("Descrição do produto 8");
    await page.locator('input[name="price"]').fill("50");
    await page.locator('input[name="stock_quantity"]').fill("50");
    await page.getByRole("button", { name: "Cadastrar" }).click();
    expect(page.getByText("Produto8")).toBeVisible();

    await page.waitForTimeout(3000);
  });

  test("should verify is the message of error is visible", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    await page.getByRole("link", { name: "Adicionar" }).click();

    await page.locator('input[name="name"]').fill("Produto9");
    await page.locator('input[name="description"]').fill("Descrição do produto 9");
    await page.locator('input[name="price"]').fill("50");
    await page.locator('input[name="stock_quantity"]').fill("50");
    await page.getByRole("button", { name: "Cadastrar" }).click();
    expect(page.getByText("Erro ao cadastrar produto!")).toBeVisible();

    await page.waitForTimeout(3000);
  });

  test("should check if the fields error message is visible", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    await page.getByRole("link", { name: "Adicionar" }).click();

    await page.getByRole("button", { name: "Cadastrar" }).click();

    expect(page.getByText("Nome deve ter até 3 caracteres")).toBeVisible();
    expect(page.getByText("Descrição deve ter até 10 caracteres")).toBeVisible();
    expect(page.getByText("Preço não pode ser 0 ou vazio")).toBeVisible();
    expect(page.getByText("Quantidade não pode ser 0 ou vazio")).toBeVisible();

    await page.waitForTimeout(3000);
  });
});
