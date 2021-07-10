import React from 'react';
import { useParams } from 'react-router-dom';

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find(a => a.id === id);
  return (
    <div>
      <h4>
        {anecdote.content} by {anecdote.author}
      </h4>
      <h5>has {anecdote.votes} votes</h5>
      <h5>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </h5>
    </div>
  );
};

export default Anecdote;
