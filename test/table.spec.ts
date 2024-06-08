import { expect, test } from "@playwright/test";

test("should verify is display the table values right", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("Produto1")).toBeVisible();
  expect(page.getByText("Produto2")).toBeVisible();
  expect(page.getByText("Produto3")).toBeVisible();
  expect(page.getByText("Produto4")).toBeVisible();
});
