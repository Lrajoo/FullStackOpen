import React, { useState } from 'react';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';

const Blog = ({ blog, user, likeBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false);

  const showBlog = () => {
    setBlogVisible(true);
  };

  const hideBlog = () => {
    setBlogVisible(false);
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
      <div style={blogStyle} className="blog">
        <span className="blogTitleAuthor">
          {blog.title} {blog.author}
        </span>
        {blogVisible ? <button onClick={hideBlog}>hide</button> : <button onClick={showBlog}>view</button>}
      </div>
      {blogVisible && (
        <>
          <div className="blogLikes">
            likes <span id="likes">{blog.likes}</span>{' '}
            <button id="likeButton" onClick={() => likeBlog(blog, user)}>
              like
            </button>
          </div>
          <div>{user.name}</div>
          <button onClick={() => removeBlog(blog)}>remove</button>
        </>
      )}
    </>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default Blog;
