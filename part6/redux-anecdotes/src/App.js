import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import reducer from './reducers/anecdoteReducer';
import { createStore } from 'redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

const store = createStore(reducer);

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div>
      <AnecdoteList anecdotes={anecdotes} />
      <AnecdoteForm />
    </div>
  );
};

export default App;
