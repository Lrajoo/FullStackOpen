import React from 'react';
import { useDispatch } from 'react-redux';

const generateId = () => Math.floor(Math.random() * 1000000);

const AnecdoteList = props => {
  const dispatch = useDispatch();

  const vote = id => {
    dispatch({
      type: 'VOTE',
      data: {
        id: id
      }
    });
  };

  return (
    <>
      <h2>Anecdotes</h2>
      {props.anecdotes
        .sort((a, b) => a.votes - b.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
