import React, { useState, useEffect } from 'react';
import blogService from '../services/blogs';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState(null);
  const id = useParams().id;

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs);
      let blog = blogs.find(n => n.id === id);
      setBlog(blog);
    });
  }, []);

  const handleNewComment = event => {
    event.preventDefault();
    // props.createBlog({
    //   title,
    //   author,
    //   url
    // });
    setComment('');
  };

  return (
    <>
      {blog && (
        <>
          <h2>
            {blog.title} {blog.author}
          </h2>
          <h5>{blog.url}</h5>
          <h6>likes</h6>
          <h6>{blog.likes} likes</h6>
          <h6>added by </h6>
          <h3>comments</h3>
          <input
            id="comment"
            placeholder="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Button onClick={handleNewComment} variant="primary">
            add comment
          </Button>
          <ul>
            {blog.comments.map(comment => (
              <li>{comment}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Blog;
