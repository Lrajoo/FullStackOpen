import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Form from './components/Form';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [newBlogTitle, setBlogTitleChange] = useState('');
  const [newBlogUrl, setBlogUrlChange] = useState('');
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async event => {
    event.preventDefault();
    window.localStorage.removeItem('loggedUser');
    setUser(null);
    setUsername('');
    setPassword('');
  };

  const handleBlogTitleChange = event => {
    setBlogTitleChange(event.target.value);
  };

  const handleBlogUrlChange = event => {
    setBlogUrlChange(event.target.value);
  };

  const addBlog = async event => {
    event.preventDefault();
    const blogObject = {
      title: newBlogTitle,
      url: newBlogUrl,
      author: user.name
    };

    blogService.create(blogObject).then(returnedBlog => {
      console.log('successfully created blog');
      setBlogs(blogs.concat(returnedBlog));
      setBlogTitleChange('');
      setBlogUrlChange('');
      setFormVisible(false);
    });
    setSuccessMessage(`a new blog ${newBlogTitle} by ${user.name}`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login">
        login
      </button>
    </form>
  );

  const handleCancelBlog = () => {
    setBlogTitleChange('');
    setBlogUrlChange('');
    setFormVisible(false);
  };

  const showForm = () => {
    setFormVisible(true);
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

  return (
    <div>
      <h2>blogs</h2>
      {user === null && loginForm()}
      {!formVisible && user !== null && (
        <button id="createNewBlog" onClick={showForm}>
          create new blog
        </button>
      )}
      {formVisible && (
        <Form
          newBlogTitle={newBlogTitle}
          newBlogUrl={newBlogUrl}
          handleBlogTitleChange={handleBlogTitleChange}
          handleBlogUrlChange={handleBlogUrlChange}
          handleCancelBlog={handleCancelBlog}
          addBlog={addBlog}
        />
      )}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {successMessage && <div className="successMessage">{successMessage}</div>}
      {user !== null && (
        <div>
          {user.name} logged in<button onClick={handleLogout}>logout</button>
        </div>
      )}
      {blogs
        .sort((a, b) => a.likes - b.likes)
        .map(blog => {
          return <Blog id="blogs" key={blog.id} blog={blog} user={user} likeBlog={likeBlog} />;
        })}
    </div>
  );
};

export default App;
