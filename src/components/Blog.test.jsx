
import {render,screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogComponets from './Blog'
const {Blog, BlogDetails} = BlogComponets
import { assert, beforeEach, describe, expect } from 'vitest'




describe('test with blog compoenet with blog details', async () => {
    beforeEach(()=>{
        const blog = {
    
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            user :{
                name : 'jhon',
                id: 1254345435,
            }
    
        }
    
        const userObj={
            name: 'jhon',
            id: 1254345435,
        }
    
        
    
        render(<Blog blog={blog}  user={userObj}/>) 
    })
    
    
    test('render blog and hidden elements 5.13',async () => {
        
    
        let title=screen.queryByText(/React patterns/i)
        let author=screen.queryByText(/Michael Chan/)
        let like_button=screen.queryByText('like')
        let like_num=screen.queryByText('7')
    
        expect(title).toBeInTheDocument()
        expect(author).toBeInTheDocument()
        expect(like_button).not.toBeInTheDocument()
        expect(like_num).not.toBeInTheDocument()
    
       
    
    })
    
    
    test('check url and number of likes displayed button click 5.14', async () => {
    
        const user=userEvent.setup()
        const viewButton = screen.getByText('View')
    
        let like_button=screen.queryByText('like')
        let like_num=screen.queryByText('7')
        let url=screen.queryByText(/https:\/\/reactpatterns.com\//)
        expect(like_button).not.toBeInTheDocument()
        expect(like_num).not.toBeInTheDocument()
        expect(url).not.toBeInTheDocument()
    
        await user.click(viewButton)
        // screen.debug()
        
        url=screen.queryByText(/https:\/\/reactpatterns.com\//)
        like_button=screen.queryByText('like')
        like_num=screen.queryByText('7')
        expect(like_button).toBeInTheDocument()
        expect(like_num).toBeInTheDocument()
        expect(url).toBeDefined()
    })
    


})

describe('testing the blog details compoent', async () => {

    let update
    let remove
    let viewDetail
    let blog
    beforeEach(()=>{

        remove=vi.fn()
        
        viewDetail=vi.fn()

        blog = {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            user :{
                name : 'jhon',
                id: 1254345435,
            }
        }
        update= () => {
            blog.likes=blog.likes+1
        }
        const userObj={
            name: 'jhon',
            id: 1254345435,
        }
        render(<BlogDetails blog={blog} onHide={viewDetail} user={userObj} remove={remove} update={update}/>)

        
    })


    test('user clicks button like button twice', async () => {

        const user=userEvent.setup()
       
        const like_button=screen.queryByText('like')
        
        // screen.debug()
        const url=screen.queryByText(/https:\/\/reactpatterns.com\//)
        let like_num=screen.queryByText('7')
        expect(like_button).toBeInTheDocument()
        expect(like_num).toBeInTheDocument()
        expect(url).toBeDefined()
        
        expect(blog.likes).toBe(7)
        await user.click(like_button)
        expect(blog.likes).toBe(8);
        await user.click(like_button)
        expect(blog.likes).toBe(9)
    })

})
// test('like button clicked twice ', async () => {

//     //since the eventhandler is not passed into blogs but nested
//     //check if likes on blog are updated

//     const user=userEvent.setup()
//     const viewButton = screen.getByText('View')

//     await user.click(viewButton)
//     // screen.debug()
    
//     const url=screen.queryByText(/https:\/\/reactpatterns.com\//)
//     const like_button=screen.queryByText('like')
//     let like_num=screen.queryByText('7')
//     expect(like_button).toBeInTheDocument()
//     expect(like_num).toBeInTheDocument()
//     expect(url).toBeDefined()

//     await user.click(like_button)

    
// }
//})


// test('render blog', async () => {

//     const blog = {

//         title: "React patterns",
//         author: "Michael Chan",
//         url: "https://reactpatterns.com/",
//         likes: 7,
//         user :{
//             name : 'jhon',
//             id: 1254345435,
//         }

//     }

//     const userObj={
//         name: 'jhon',
//         id: 1254345435,
//     }

//     render(<Blog blog={blog} user={userObj}/>) 

//     let like_button
//     let url
//     try {
//         like_button=screen.getByText('like');
//     } catch (error) {
//         like_button=null
//     }

    
//     url=screen.queryByText(/https:\/\/reactpatterns.com\//)
  

//     expect(like_button).toBeNull() // like button not rendered applying likes do not show
//     expect(url).toBeNull() // url not rendered 
//     const element = screen.getByText(/React patterns/);
//     const user=userEvent.setup()

//     expect(element).toBeDefined();
   
//     const viewButton = screen.getByText('View')
//     screen.debug(viewButton)
//     await user.click(viewButton)
//     url=screen.queryByText(/https:\/\/reactpatterns.com\//)

//     const hide_button=screen.getByText('Hide')
//     expect(url).toBeDefined()

//     screen.debug()
//     await user.click(hide_button)

//     url = screen.queryByText(/https:\/\/reactpatterns.com\//)

//     expect(url).toBeNull()


// })