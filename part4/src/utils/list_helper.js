const dummy = blogs => {
  return 1;
};

const totalLikes = blog => {
  return blog[0].likes;
};

const favoriteBlog = blogs => {
  let indexBlogWithMostLikes = 0;
  let blogWithMostLikes = 0;
  blogs.forEach((blog, index) => {
    if (blog.likes > blogWithMostLikes) {
      indexBlogWithMostLikes = index;
      blogWithMostLikes = blog.likes;
    }
  });
  return blogs[indexBlogWithMostLikes];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
