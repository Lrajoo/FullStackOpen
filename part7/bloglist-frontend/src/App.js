import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import NewBlog from './components/NewBlog';
import Users from './components/Users';
import User from './components/User';
import blogService from './services/blogs';
import loginService from './services/login';
import storage from './utils/storage';
import { Button, Navbar, Nav } from 'react-bootstrap';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);

  const blogFormRef = React.createRef();

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const user = storage.loadUser();
    setUser(user);
  }, []);

  const notifyWith = (message, type = 'success') => {
    setNotification({
      message,
      type
    });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });

      setUsername('');
      setPassword('');
      setUser(user);
      notifyWith(`${user.name} welcome back!`);
      storage.saveUser(user);
    } catch (exception) {
      notifyWith('wrong username/password', 'error');
    }
  };

  const createBlog = async blog => {
    try {
      const newBlog = await blogService.create(blog);
      // blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(newBlog));
      notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`);
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleLike = async id => {
    const blogToLike = blogs.find(b => b.id === id);
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id };
    await blogService.update(likedBlog);
    setBlogs(blogs.map(b => (b.id === id ? { ...blogToLike, likes: blogToLike.likes + 1 } : b)));
  };

  const handleRemove = async id => {
    const blogToRemove = blogs.find(b => b.id === id);
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`);
    if (ok) {
      await blogService.remove(id);
      setBlogs(blogs.filter(b => b.id !== id));
    }
  };

  const handleLogout = () => {
    setUser(null);
    storage.logoutUser();
  };

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification notification={notification} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input id="username" value={username} onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input id="password" value={password} onChange={({ target }) => setPassword(target.value)} />
          </div>
          <Button id="login" variant="primary">
            Login
          </Button>
        </form>
      </div>
    );
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  return (
    <div>
      <Router>
        <Navbar bg="light">
          <Nav className="mr-auto">
            <Nav.Link href="/blogs">Blogs</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="/create">Create</Nav.Link>
          </Nav>
        </Navbar>
        <h2>blogs</h2>
        <p>
          {user.name} logged in
          <Button onClick={handleLogout} variant="primary">
            Logout
          </Button>
        </p>
        <Switch>
          <Route path="/blogs" exact>
            {blogs.sort(byLikes).map(blog => (
              <Blogs
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                handleRemove={handleRemove}
                // own={user.username === blog.user.username}
              />
            ))}
          </Route>
          <Route path="/users" exact>
            <Users />
          </Route>
          <Route path="/users/:id" exact>
            <User />
          </Route>
          <Route path="/blogs/:id" exact>
            <Blog />
          </Route>
          <Route path="/create">
            <Notification notification={notification} />
            <NewBlog createBlog={createBlog} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
