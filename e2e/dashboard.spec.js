import { test } from "@playwright/test";

test("dashboard", async ({ page }) => {
  await page.goto("https://localhost:3010/login");
  await page.getByLabel("Username").click();
  await page.getByLabel("Username").fill("d");
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill("d");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByTitle("2").getByText("2").click();
  await page
    .getByRole("row", {
      name: "11 Albert Einstein Albert Einstein Human arrow-up Male Dead info-circle",
    })
    .getByRole("button")
    .click();
  await page.getByPlaceholder("Start date").click();
  await page.getByText("Last 30 days").click();
  await page
    .locator("#sticky-header-title div")
    .filter({ hasText: "My App" })
    .click();
  await page.getByRole("button", { name: "plus" }).click();
  await page.getByRole("button", { name: "user" }).click();
  await page.getByRole("button", { name: "logout" }).click();
  await page.goto("https://localhost:3010/dashboard");
  await page.goto("https://localhost:3010/login");
});
