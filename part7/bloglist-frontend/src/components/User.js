import React, { useState, useEffect, use } from 'react';
import userService from '../services/users';
import { useParams } from 'react-router-dom';

const User = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const id = useParams().id;
  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users);
      let user = users.find(n => n.id === id);
      setUser(user);
    });
  }, []);
  return (
    <>
      {user && (
        <>
          <h2>{user.name}</h2>
          <h4>added blogs</h4>
          <ul>
            {user.blogs.map(blog => {
              return <li key={blog.id}>{blog.title}</li>;
            })}
          </ul>
        </>
      )}
    </>
  );
};

export default User;
