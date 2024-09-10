const { test, expect, beforeEach } = require('@playwright/test')
const { describe } = require('node:test')


describe('Blog app', () => {




    test('front page can be opened', async ({ page }) => {

        console.log('Running tests with worker:', process.env.CI ? 'CI' : 'default=1')
        await page.goto('http://localhost:5173')
        const locator = await page.getByText('Blogs')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Username')).toBeVisible()
        await expect(page.getByText('Password')).toBeVisible()
    })






})

