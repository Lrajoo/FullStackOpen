import React from 'react';
import { Button } from 'react-bootstrap';
const Form = ({ newBlogTitle, newBlogUrl, handleBlogTitleChange, handleBlogUrlChange, handleCancelBlog, addBlog }) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        <input placeholder="Title" id="title" value={newBlogTitle} onChange={handleBlogTitleChange} />
      </div>
      <div>
        <input placeholder="URL" id="URL" value={newBlogUrl} onChange={handleBlogUrlChange} />
      </div>
      <div>
        <Button otype="submit" variant="primary">
          Create
        </Button>
      </div>
      <div>
        <Button onClick={handleCancelBlog} variant="primary">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default Form;
