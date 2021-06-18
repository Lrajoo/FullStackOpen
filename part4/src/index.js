const config = require('./utils/config');
const logger = require('./utils/logger');
const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogsRouter = require('./controllers/blog');
const mongoUrl = process.env.MONGODB_URI;
const middleware = require('./utils/middleware');

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// app.get('/', (request, response) => {
//   Blog.find({}).then(blogs => {
//     response.json(blogs);
//   });
// });

// app.post('/', (request, response) => {
//   const blog = new Blog(request.body);
//   blog.save().then(result => {
//     response.status(201).json(result);
//   });
// });

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
