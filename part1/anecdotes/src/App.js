import React, { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ];

  const [selected, setSelected] = useState(0);
  const [mostVotes, setMostVotes] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const getNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
    setMostVotes(points.indexOf(Math.max(...points)));
  };
  const setVote = () => {
    let updatedPoints = [...points];
    updatedPoints[selected] += 1;
    setPoints(updatedPoints);
    setMostVotes(points.indexOf(Math.max(...points)));
  };
  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <button onClick={getNextAnecdote}>next anecdote</button>
      <button onClick={setVote}>vote</button>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[mostVotes]}</div>
      <div>has {points[mostVotes]} votes</div>
    </>
  );
};

export default App;
