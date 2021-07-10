import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect } from 'react-router-dom';
import About from './components/About';
import Footer from './components/Footer';
import Menu from './components/Menu';
import CreateNew from './components/CreateNew';
import AnecdoteList from './components/AnecdoteList';
import Anecdote from './components/Anecdote';
import Notification from './components/Notification';

const App = () => {
  const history = useHistory();
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ]);
  const [notification, setNotification] = useState('');

  const addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    window.history.pushState({}, 'React App', '/');
    setNotification(`a new anecdote, ${anecdote.content} created`);
    setTimeout(() => {
      setNotification(null);
    }, 10000);
  };

  const anecdoteById = id => anecdotes.find(a => a.id === id);

  const vote = id => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <Router>
        <h1>Software anecdotes</h1>
        <Menu />
        <Switch>
          <Route path="/" exact>
            <Notification notification={notification} />
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
          <Route path="/create" exact>
            <CreateNew addNew={addNew} />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/anecdotes/:id" exact>
            <Anecdote anecdotes={anecdotes} />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
