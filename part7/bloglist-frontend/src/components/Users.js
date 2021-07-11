import React, { useState, useEffect } from 'react';
import userService from '../services/users';
import { Table } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState([]);
  console.log('users,', users);
  useEffect(() => {
    userService.getAll().then(users => setUsers(users));
  }, []);
  return (
    <>
      <h2>Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td>
                  <a href={`/users/${user.id}`}>{user.name}</a>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Users;
