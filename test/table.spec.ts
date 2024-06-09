import { expect, test } from "@playwright/test";

test("should verify is display the table values right", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByText("Produto1")).toBeVisible();
});
