import React, { useState, useEffect } from 'react';
import Title from './components/Title';
import Persons from './components/Persons';
import Filter from './components/Filter';
import Form from './components/Form';
import addressService from './services/addresses';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [searchPersons, setSearchPersons] = useState(persons);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getPersons = () => {
    addressService.getAll().then(response => {
      setPersons(response);
      setSearchPersons(response);
    });
  };

  useEffect(getPersons, []);

  const addPerson = event => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    };
    let nameExists = false;
    persons.forEach(person => {
      if (person.name === newName) {
        nameExists = true;
      }
    });
    if (nameExists) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const p = persons.find(person => person.name === personObject.name);
        addressService.update(p.id, personObject);
        setSuccessMessage(`Updated ${personObject.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
    } else {
      addressService.create(personObject);
      setPersons(persons.concat(personObject));
      setSearchPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
      setNewFilter('');
      setSuccessMessage(`Added ${personObject.name}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }
  };

  const handleNameChange = event => setNewName(event.target.value);

  const handleNumberChange = event => setNewNumber(event.target.value);

  const handleFilterChange = event => {
    setNewFilter(event.target.value);
    let searched = persons.filter(person => {
      return person.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setSearchPersons(searched);
  };

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}`)) {
      addressService
        .deletePerson(person.id)
        .then(response => {
          let i;
          persons.forEach((p, index) => {
            if (p.name === person.name) {
              i = index;
            }
          });
          let updatedPersons = persons.splice(i, 1);
          setPersons(updatedPersons);
        })
        .catch(e => {
          setErrorMessage(`Information of ${person.name} has already been removed from the server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        });
    }
  };

  return (
    <div>
      <Title title="Phonebook" />
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {successMessage && <div className="successMessage">{successMessage}</div>}
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Title title="add a new" />
      <Form
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Title title="Numbers" />
      <Persons persons={searchPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
