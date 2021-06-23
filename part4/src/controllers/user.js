const usersRouter = require('express').Router();
const User = require('../models/user');
const Blog = require('../models/blog');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });
  response.json(users.map(user => user.toJSON()));
});

usersRouter.post('/', async (request, response, next) => {
  const body = request.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  });

  const savedUser = await user
    .save()
    .then(user => {
      response.json(user.toJSON());
    })
    .catch(error => next(error));
});

module.exports = usersRouter;
