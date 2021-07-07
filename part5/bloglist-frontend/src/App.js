import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
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
    console.log('logging in with', username, password);
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
      setBlogs(blogs.concat(returnedBlog));
      setBlogTitleChange('');
      setBlogUrlChange('');
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
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <input value={newBlogTitle} onChange={handleBlogTitleChange} />
      <input value={newBlogUrl} onChange={handleBlogUrlChange} />
      <button type="submit">save</button>
    </form>
  );

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogForm()}
      <h2>blogs</h2>
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {successMessage && <div className="successMessage">{successMessage}</div>}
      {user !== null && (
        <div>
          {user.name} logged in<button onClick={handleLogout}>logout</button>
        </div>
      )}
      {blogs.map(blog => {
        return <Blog key={blog.id} blog={blog} />;
      })}
    </div>
  );
};

export default App;
