import React from 'react';

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
        <button type="submit">Create</button>
      </div>
      <div>
        <button onClick={handleCancelBlog}>Cancel</button>
      </div>
    </form>
  );
};

export default Form;
