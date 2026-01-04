# The ultimate cheatsheet

## Important
> Always import test and expect at the start 

    import { test, expect } from '@playwright/test';

> Every interactive step starts with await  

    await page.goto("https://xyz.com/",()=>{});

> Every test have default timeOut of 30000ms (30 secs), change it if the test is too long

    test.timeOut(300000)


## Visit a page
goto an URL 

    await page.goto("URL");


<br>

## Element Selection

### page.getByText
Get any text element on Page. Best for finding an element that have a unique text and non unique attributes.

    page.getByText('text').click()

<br>

### page.getByLabel
Use this if your input has a visible \<label> tag. It is the most resilient to UI changes.

    await page.getByLabel('label').fill('text');

<br>

### page.getByPlaceholder
Use this if there is a unique placeholder on the page

    await page.getByPlaceholder('placeholder').fill('text');

<br>

### page.getByRole
Useful if you want to be specific about the type of element.

    await page.getByRole('textbox', { name: 'label' }).fill('text');
---
**Note:** The 'name' attribute here is 'myLabel' from the label element:

    <label for="someId">myLabel</label>
---

| Role | HTML Element(s) | Use Case |
| :--- | :--- | :--- |
| **`textbox`** | `<input type="text">`, `<textarea>` | Any text entry field. |
| **`button`** | `<button>`, `<input type="submit">` | Clickable buttons. |
| **`link`** | `<a href="...">` | Hyperlinks. |
| **`checkbox`** | `<input type="checkbox">` | Toggle options. |
| **`heading`** | `<h1>` through `<h6>` | Page titles and section headers. |
| **`img`** | `<img>` | Images (uses the `alt` text as the "name"). |
| **`combobox`** | `<select>`, `<ul>` | Dropdown menus or autocomplete fields. |
| **`alert`** | `<div>` with alert role | Success messages or error popups. |

<br>

### page.locator
Use this as a fallback if you have a unique ID or class.

    await page.locator('#id').fill('text');

| Selector Type | Syntax Example | When to Use |
| :--- | :--- | :--- |
| **CSS ID** | `page.locator('#first')` | When the element has a unique `id` attribute. |
| **CSS Class** | `page.locator('.submit-btn')` | When targeting elements with a specific styling class. |
| **Attribute** | `page.locator('[data-slot="input"]')` | When using custom data attributes like `data-testid`. |
| **Element Type** | `page.locator('input')` | To find all elements of a certain tag (best with `.first()`). |
| **Text (CSS)** | `page.locator('text=Sign Up')` | A quick way to find an element containing specific text. |
| **Nested** | `page.locator('form >> #first')` | To find an element inside a specific parent container. |
| **XPath** | `page.locator('xpath=//span/a')` | For complex tree navigation (use as a last resort). |

<br>

## common methods

| Method | Action | Example |
| :--- | :--- | :--- |
| **`.fill()`** | Clears the field and types. | `await page.locator('#first').fill('Jane')` |
| **`.click()`** | Clicks the element. | `await page.locator('button.save').click()` |
| **`.check()`** | Checks a checkbox or radio. | `await page.locator('#terms').check()` |
| **`.count()`** | Returns number of matches. | `const count = await page.locator('li').count()` |
| **`.first()`** | Grabs the first match. | `await page.locator('input').first().fill('Text')` |
| **`.getAttribute()`** | Gets a specific attribute. | `const val = await page.locator('input').getAttribute('value')` |
| **`.waitFor()`** | Waits for specific state. | `await page.locator('#loader').waitFor({ state: 'hidden' })` |