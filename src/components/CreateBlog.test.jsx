import {render,screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogComponets from './CreateBlog'
const {CreateBlog, Form} = CreateBlogComponets
import { assert, beforeEach, describe, expect } from 'vitest'
import { element } from 'prop-types'





test('test form creation with valid inputs', async () => {
    


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

    const requestCreate = vi.fn((e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const formData = {};
        data.forEach((value, key) => {
            formData[key] = value;
        });
        expect(formData).toEqual({
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/"
        });
    });

    render(<Form blog={blog}  requestCreate={requestCreate} inputHandel={vi.fn} visable={true} onPress={vi.fn} />)

    const user= userEvent.setup()


    const createButton = screen.getByText('Create');



    await user.click(createButton);

    expect(requestCreate).toHaveBeenCalled();


})