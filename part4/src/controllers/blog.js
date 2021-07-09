const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    ...request.body,
    user: request.user.id
  });
  if (blog['likes'] === undefined) {
    blog['likes'] = 0;
  }
  if (blog['title'] === undefined && blog['url'] === undefined) {
    response.status(400).json({ error: 'Title and URL are needed' });
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.user);
  await user.save();
  response.json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response, next) => {
  // await Blog.findByIdAndRemove(request.params.id);
  if (!request.token || !request.decodedToken) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() === request.user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      response.status(400).end();
    }
  } catch (e) {
    response.status(400).end();
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  console.log('put here');
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON());
    })
    .catch(error => next(error));
});

module.exports = blogsRouter;
