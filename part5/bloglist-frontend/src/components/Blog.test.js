import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';
import Form from './Form';

test('renders content', () => {
  const blog = {
    author: 'John Nick',
    id: '123456789',
    likes: 0,
    title: 'Title',
    url: 'testurl'
  };
  const user = {
    name: 'testName',
    token: '123345678',
    username: 'testUsername'
  };

  const component = render(<Blog key="123456789" blog={blog} user={user} />);
  const div = component.container.querySelector('.blogTitleAuthor');
  expect(div).toHaveTextContent('Title John Nick');
});

test('view button clicked', () => {
  const blog = {
    author: 'John Nick',
    id: '123456789',
    likes: 0,
    title: 'Title',
    url: 'testurl'
  };
  const user = {
    name: 'testName',
    token: '123345678',
    username: 'testUsername'
  };

  const component = render(<Blog key="123456789" blog={blog} user={user} />);

  const button = component.getByText('view');
  fireEvent.click(button);
  const div = component.container.querySelector('.blogLikes');
  expect(div).toHaveTextContent('likes');
});

test('like button is clicked twice', () => {
  const likeBlog = jest.fn();

  const blog = {
    author: 'John Nick',
    id: '123456789',
    likes: 0,
    title: 'Title',
    url: 'testurl'
  };
  const user = {
    name: 'testName',
    token: '123345678',
    username: 'testUsername'
  };

  const component = render(<Blog key="123456789" blog={blog} user={user} likeBlog={likeBlog} />);

  const button = component.getByText('view');
  fireEvent.click(button);
  const like = component.getByText('like');
  fireEvent.click(like);
  fireEvent.click(like);

  expect(likeBlog.mock.calls).toHaveLength(2);
});

test('blog form', () => {
  const newBlogTitle = 'Title';
  const newBlogUrl = 'URL';
  const handleBlogTitleChange = jest.fn();
  const handleBlogUrlChange = jest.fn();
  const handleCancelBlog = jest.fn();
  const addBlog = jest.fn();
  const component = render(
    <Form
      newBlogTitle={newBlogTitle}
      newBlogUrl={newBlogUrl}
      handleBlogTitleChange={handleBlogTitleChange}
      handleBlogUrlChange={handleBlogUrlChange}
      handleCancelBlog={handleCancelBlog}
      addBlog={addBlog}
    />
  );
  const create = component.getByText('Create');
  fireEvent.click(create);
  expect(addBlog.mock.calls).toHaveLength(1);
});
