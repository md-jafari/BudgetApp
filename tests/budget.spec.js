// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('127.0.0.1:5500/');

  // Expect the title to match.
  await expect(page).toHaveTitle(/Budget Application/);
});

test('Add income and month', async ({ page }) => {
  await page.goto('127.0.0.1:5500/');

  //Find input for income
  let income = await page.locator('#income-input');
  let month = await page.locator('#income-date');

  let date = "2023-01"; //https://www.lambdatest.com/learning-hub/automate-date-pickers-with-playwright

  //Add data for income
  await income.fill('27500');
  await month.fill(date);

  //Save input
  await page.keyboard.press('Enter'); //Enter works here instead of submit but not on expense
 
  //Click on All to make income data visible
  let allButton = await page.locator('#allButton');
  await allButton.click();

  //Get income data
  let newIncome = await page.locator('#income-result').textContent();//convert as text
  let newdate = await page.locator('#income-month').textContent();
  //check if data is equivalent
  await expect(newIncome).toEqual('Income: 27500');
  await expect(newdate).toEqual('2023-01');

});

test('Add expense, title, month and category', async ({ page }) => {
  await page.goto('127.0.0.1:5500/');

  //Find input for expense
  let expense = await page.locator('#expense-input');
  let title = await page.locator('#title-input');
  let date = await page.locator('#expense-date');
  let category = await page.locator('#category-input');

  let inputDate = "2023-01-25"; //https://www.lambdatest.com/learning-hub/automate-date-pickers-with-playwright

  //Add data for expense
  await expense.fill('5000');
  await title.fill('mat');
  await date.fill(inputDate);
  await category.selectOption('Food');

  //Save input
  await page.click('button[id="submitExpense"]');
 
  //Click on All to make expense data visible
  let allButton = await page.locator('#allButton');
  await allButton.click();

  //Get expense data
  let newExpense = await page.locator('#expense-result').textContent();
  let newTitle = await page.locator('#title-result').textContent();
  let newDate = await page.locator('#date-result').textContent();
  let newCategory = await page.locator('#category-result').textContent();
  
  //check if data is equivalent
  await expect(newExpense).toEqual('5000');
  await expect(newTitle).toEqual('mat');
  await expect(newDate).toEqual('2023-01-25');
  await expect(newCategory).toEqual('Food');
});
