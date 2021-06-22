const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs);
    })
    .catch(error => next(error));
});

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);
  if (blog['likes'] === undefined) {
    blog['likes'] = 0;
  }
  if (blog['title'] === undefined && blog['url'] === undefined) {
    console.log('return 400 error');
    response.status(400).json({ error: error.message });
  }
  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    })
    .catch(error => next(error));
});

module.exports = blogsRouter;
