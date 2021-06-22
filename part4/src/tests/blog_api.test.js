const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index');
const api = supertest(app);
const Blog = require('../models/blog');
const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    _id: '5a422a851b54a676234d17f6',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    _id: '5a422a851b54a676234d17f5',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    _id: '5a422a851b54a676234d17f4',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test('Blog List Test Step 1', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(2);
});

test('Blog List Test Step 2', async () => {
  const response = await api.get('/api/blogs');
  const blog = response.body[0];
  expect(blog.id).toBeDefined();
});

test('Blog List Test Step 3', async () => {
  const newBlog = {
    _id: '5a422a851b54a676234d17f3',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  };
  const blogsAtStart = await api.get('/api/blogs');
  await api.post('/api/blogs').send(newBlog);
  const blogsAtEnd = await api.get('/api/blogs');
  expect(blogsAtEnd.body.length).toEqual(blogsAtStart.body.length + 1);
});

test('Blog List Test Step 4', async () => {
  const newBlog = {
    _id: '5a422a851b54a676234d17f2',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/'
  };
  await api.post('/api/blogs').send(newBlog);
  const blogsAtEnd = await api.get('/api/blogs');
  const lastBlog = blogsAtEnd.body[blogsAtEnd.body.length - 1];
  expect(lastBlog.likes).toBe(0);
});

test('Blog List Test Step 5', async () => {
  const newBlog = {
    _id: '5a422a851b54a676234d17f1',
    author: 'Michael Chan'
  };
  const response = await api.post('/api/blogs').send(newBlog);
  expect(response.status).toBe(400);
});

afterAll(() => {
  mongoose.connection.close();
});
