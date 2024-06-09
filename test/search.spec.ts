import { expect, test } from "@playwright/test";
test("check if the functionality to filter product by name is correct", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.locator('input[name="search"]').fill("Produto1");
  await page.getByTestId("button-search").click();

  const rows = await page.getByRole("row").all();
  await expect(rows.length).toBe(2);
});
