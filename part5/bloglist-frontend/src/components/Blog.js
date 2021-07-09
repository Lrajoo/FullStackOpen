import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, user }) => {
  const [blogVisible, setBlogVisible] = useState(false);

  const showBlog = () => {
    setBlogVisible(true);
  };

  const hideBlog = () => {
    setBlogVisible(false);
  };

  const likeBlog = async (blog, user) => {
    const blogObject = {
      title: blog.title,
      url: blog.url,
      author: user.name,
      likes: (blog.likes += 1)
    };
    try {
      await blogService.update(blog.id, blogObject);
    } catch (exception) {
      console.log('error when liking a blog');
    }
  };

  const removeBlog = async blog => {
    try {
      await blogService.remove(blog.id);
    } catch (exception) {
      console.log('error when removing a blog');
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <>
      <div style={blogStyle}>
        {blog.title} {blog.author}{' '}
        {blogVisible ? <button onClick={hideBlog}>hide</button> : <button onClick={showBlog}>view</button>}
      </div>
      {blogVisible && (
        <>
          <div>
            likes {blog.likes} <button onClick={() => likeBlog(blog, user)}>like</button>
          </div>
          <div>{user.name}</div>
          <button onClick={() => removeBlog(blog)}>remove</button>
        </>
      )}
    </>
  );
};

export default Blog;
