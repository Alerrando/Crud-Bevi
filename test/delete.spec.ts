import { expect, test } from "@playwright/test";

test.describe("delete", () => {
  test("should verify is the delete product functionality  is right", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    await page.getByRole("row", { name: "Descrição do produto 4" }).getByRole("img").nth(1).click();

    await page.getByRole("button", { name: "Confirmar" }).click();

    expect(page.getByText("Produto deletado com sucesso!")).toBeVisible();

    await page.waitForTimeout(2000);
  });

  test("should verify is the message of error is visible", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    await page.getByRole("row", { name: "Descrição do produto 2" }).getByRole("img").nth(1).click();

    await page.getByRole("button", { name: "Confirmar" }).click();

    expect(page.getByText("Erro ao deletar produto!")).toBeVisible();

    await page.waitForTimeout(3000);
  });
});
