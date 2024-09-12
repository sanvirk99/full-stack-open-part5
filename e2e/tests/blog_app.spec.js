const { test, expect, beforeEach, describe, after } = require('@playwright/test')
const { request } = require('http')
const { element } = require('prop-types')

const test_blogs = [
    {

        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,

    },
    {

        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,

    },
    {

        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {

        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,

    },
    {

        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,

    },
    {

        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,

    }
]

const test_users = [
    {
        username: "testuser0",
        name: "testname0",
        password: "testpassword0"
    },
    {
        username: "testuser1",
        name: "testname1",
        password: "testpassword1"
    }
]

describe('Blog app', () => {

    beforeEach(async ({ page }) => {

        console.log('Running tests with worker:', process.env.CI ? 'CI' : 'default=1')


        await page.goto('http://localhost:5173')

    })


    test('Login Form is shown', async ({ page }) => {


        const locator = await page.getByText('Blogs')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Username')).toBeVisible()
        await expect(page.getByText('Password')).toBeVisible()
    })






})


describe('Login', async () => {

    beforeEach(async ({ page, request }) => {

        let res = await request.post('http://localhost:3003/api/testing/reset')
        //console.log(res)
        res = await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }
        })
        //console.log(res)

        await page.goto('http://localhost:5173')


    })


    test('fails with incorrect cerdentials ', async ({ page }) => {


        await page.getByTestId('username').fill('test')
        await page.getByTestId('password').fill('password')

        await page.getByRole('button', { name: 'Login' }).click()

        await expect(page.getByText('wrong username or password')).toBeVisible()


    })


    test('succeeds with correct credentials ', async ({ page }) => {


        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('salainen')

        await page.getByRole('button', { name: 'Login' }).click()

        await expect(page.getByText(/Welcome back Matti Luukkainen/)).toBeVisible()


    })

})


describe('When logged in', () => {

    beforeEach(async ({ page, request }) => {

        let res = await request.post('http://localhost:3003/api/testing/reset')
        //console.log(res)
        res = await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }
        })
        //console.log(res)

        await page.goto('http://localhost:5173')
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', { name: 'Login' }).click()
        await expect(page.getByText(/Welcome back Matti Luukkainen/)).toBeVisible()


    })


    test('a new blog can be created', async ({ page }) => {


        await page.getByRole('button', { name: /create new blog/ }).click()
        let blog = test_blogs[0]
        await page.getByTestId('title').fill(blog.title)
        await page.getByTestId('author').fill(blog.author)
        await page.getByTestId('url').fill(blog.url)
        await page.getByRole('button', { name: /Create/ }).click()

        await expect(page.getByText(/a new/)).toBeVisible()
        await expect(page.getByText(/React patterns Michael Chan/)).toBeVisible()

    })


})


describe('created blog operations', () => {

    beforeEach(async ({ page, request }) => {

        let res = await request.post('http://localhost:3003/api/testing/reset')
        //console.log(res)
        res = await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }
        })
        //console.log(res)

        await page.goto('http://localhost:5173')
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', { name: 'Login' }).click()
        await expect(page.getByText(/Welcome back Matti Luukkainen/)).toBeVisible()

        await page.getByRole('button', { name: /create new blog/ }).click()
        let blog = test_blogs[0]
        await page.getByTestId('title').fill(blog.title)
        await page.getByTestId('author').fill(blog.author)
        await page.getByTestId('url').fill(blog.url)
        await page.getByRole('button', { name: /Create/ }).click()

        await expect(page.getByText(/a new/)).toBeVisible()
        await expect(page.getByText(/React patterns Michael Chan/)).toBeVisible()

    })


    test('blog can be liked', async ({ page }) => {

        await page
            .getByRole('listitem')
            .filter({ has: page.getByText(/React patterns Michael Chan/) })
            .getByRole('button', { name: /View/ })
            .click()

        await page.getByRole('listitem')
            .filter({ has: page.getByText(/React patterns Michael Chan/) })
            .getByRole('button', { name: /like/ })
            .click()

        const likeElement = page.getByTestId('like')
        await expect(likeElement).toHaveText(/1/);



    })

    test('blog can be deleted', async ({ page }) => {

        await page
            .getByRole('listitem')
            .filter({ has: page.getByText(/React patterns Michael Chan/) })
            .getByRole('button', { name: /View/ })
            .click()

        page.on('dialog', async dialog => await dialog.accept())
        await page.getByRole('listitem')
            .filter({ has: page.getByText(/React patterns Michael Chan/) })
            .getByRole('button', { name: /Remove/ })
            .click()

        await expect(page.getByText(/React patterns Michael Chan/)).not.toBeVisible();

    })

    test('user not creator will not see remove button', async ({page, request}) => {

        let res = await request.post('http://localhost:3003/api/users', {
            data: test_users[0]
        })

        await page
        .getByRole('listitem')
        .filter({ has: page.getByText(/React patterns Michael Chan/) })
        .getByRole('button', { name: /View/ })
        .click()

        await expect(page.getByRole('button', { name: /Remove/ })).toBeVisible();

        await page.getByRole('button', {name: /Logout/}).click()
        let user=test_users[0]

        await page.getByTestId('username').fill(user.username)
        await page.getByTestId('password').fill(user.password)
        await page.getByRole('button', { name: 'Login' }).click()

        await expect(page.getByText(/React patterns Michael Chan/)).toBeVisible()

        await page
        .getByRole('listitem')
        .filter({ has: page.getByText(/React patterns Michael Chan/) })
        .getByRole('button', { name: /View/ })
        .click()

        await page.getByRole('listitem')
            .filter({ has: page.getByText(/React patterns Michael Chan/) })

        await expect(page.getByRole('button', { name: /Remove/ })).not.toBeVisible();
    })


})




describe('user create blogs and make sure they are arranged in the order of their likes', () =>{


        beforeEach( async ({page,request})=>{
            

            let res = await request.post('http://localhost:3003/api/testing/reset')
            //console.log(res)
            res = await request.post('http://localhost:3003/api/users', {
                data: {
                    name: 'Matti Luukkainen',
                    username: 'mluukkai',
                    password: 'salainen'
                }
            })
            //console.log(res)
    
            await page.goto('http://localhost:5173')
            await page.getByTestId('username').fill('mluukkai')
            await page.getByTestId('password').fill('salainen')
            await page.getByRole('button', { name: 'Login' }).click()
            await expect(page.getByText(/Welcome back Matti Luukkainen/)).toBeVisible()
    
           

        })


        test('user creates mulitple blogs', async ({page}) =>{


            await page.getByRole('button', { name: /create new blog/ }).click()


            for(let i=0;i<test_blogs.length-4;i++){

                let blog = test_blogs[i]
                await page.getByTestId('title').fill(blog.title)
                await page.getByTestId('author').fill(blog.author)
                await page.getByTestId('url').fill(blog.url)
                await page.getByRole('button', { name: /Create/ }).click()

                await expect(page.getByText(/a new/)).toBeVisible()
                await expect(page.getByText(/a new/)).not.toBeVisible()
                
            }



            // await page.getByRole('listitem').locator('div').filter({ hasText: 'React patterns Michael Chan' }).getByRole('button').click()
            // await page.getByRole('listitem').locator('div').filter({ hasText: 'Go To Statement Considered' }).getByRole('button').click()

            // await page.getByRole('listitem').locator('div').filter({ hasText: 'Go To Statement Considered' }).getByRole('button', {name: /like/}).click()

            let items = await page.getByRole('listitem').all();

            await expect(items[0]).toContainText(test_blogs[0].title);
            await expect(items[1]).toContainText(test_blogs[1].title);

            for (const item of items) {
                await item.getByRole('button').click();

            }

            let count=1
            for (const item of items){

                

                for(let i=0; i < count; i++){
                    await item.getByRole('button', {name:/like/}).click();
                    await page.waitForTimeout(1000);
                }
                count++;
            }

          

            
            items = await page.getByRole('listitem').all();

            for (const item of items) {
                await item.getByRole('button').click();

            }
            

            items = await page.getByRole('listitem').all();

            await expect(items[1]).toContainText(/React patterns Michael Chan/);
            await expect(items[0]).toContainText(/Go To Statement Considered/);

           
            
    
        })












})


