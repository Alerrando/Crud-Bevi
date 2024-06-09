import { expect, test } from "@playwright/test";

test.describe("Edit", () => {
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

  test("should verify is the message of error is visible", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    await page.getByRole("row", { name: "Descrição do produto 3" }).getByRole("img").first().click();

    await page.locator('input[name="name"]').fill("Produto11");
    await page.locator('input[name="description"]').fill("Descrição do produto 11");
    await page.locator('input[name="price"]').fill("47");
    await page.locator('input[name="stock_quantity"]').fill("135");
    const locator = await page.getByRole("combobox");
    locator.selectOption(["2"]);

    await page.getByRole("button", { name: "Editar" }).click();

    expect(page.getByText("Erro ao editar produto!")).toBeVisible();

    await page.waitForTimeout(2000);
  });

  test("should check if the fields error message is visible", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    await page.getByRole("link", { name: "Adicionar" }).click();

    await page.locator('input[name="name"]').fill("");
    await page.locator('input[name="description"]').fill("");
    await page.locator('input[name="price"]').fill("");
    await page.locator('input[name="stock_quantity"]').fill("");

    await page.getByRole("button", { name: "Cadastrar" }).click();

    expect(page.getByText("Nome deve ter até 3 caracteres")).toBeVisible();
    expect(page.getByText("Descrição deve ter até 10 caracteres")).toBeVisible();
    expect(page.getByText("Preço não pode ser 0 ou vazio")).toBeVisible();
    expect(page.getByText("Quantidade não pode ser 0 ou vazio")).toBeVisible();

    await page.waitForTimeout(3000);
  });
});
