import React from 'react';
import { useDispatch } from 'react-redux';

const generateId = () => Math.floor(Math.random() * 1000000);

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: content,
        id: generateId(),
        votes: 0
      }
    });
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
