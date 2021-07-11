import axios from 'axios';
const baseUrl = '/api/users';

const getAll = () => {
  const request = axios.get('http://localhost:3003/api/users');
  return request.then(response => {
    return response.data;
  });
};

export default { getAll };
