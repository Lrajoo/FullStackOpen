import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const Blogs = ({ blog, handleLike, handleRemove, own }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const label = visible ? 'hide' : 'view';

  return (
    <div style={blogStyle} className="blog">
      <div>
        <i>
          <a href={`/blogs/${blog.id}`}>{blog.title}</a>
        </i>
        by {blog.author}
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <Button onClick={() => handleLike(blog.id)} variant="primary">
              like
            </Button>
          </div>
          <div>{blog.user.name}</div>
          {own && (
            <Button onClick={() => handleRemove(blog.id)} variant="primary">
              remove
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

Blogs.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
};

export default Blogs;
