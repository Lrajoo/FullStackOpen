import React, { useState } from 'react';
import Filter from './components/Filter';
import axios from 'axios';
import Countries from './components/Countries';
import Country from './components/Country';

function App() {
  const [newFilter, setNewFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [message, setMessage] = useState('');
  const [weather, setWeather] = useState(null);

  const getCountries = countryName => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${countryName}`)
      .then(response => {
        if (response.data.length > 10) {
          setMessage('Too many matches, specify another filter');
          setCountries([]);
          setCountry(null);
        } else if (response.data.length === 1) {
          setCountry(response.data[0]);
          setMessage('');
          setCountries([]);
          getWeather(response.data[0].name);
        } else if (1 < response.data.length <= 10) {
          setMessage('');
          setCountries(response.data);
          setCountry(null);
        }
      })
      .catch(e => {
        console.log('error Country API');
      });
  };

  const getWeather = countryName => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${countryName}`)
      .then(response => {
        setWeather(response.data.current);
      })
      .catch(e => {
        console.log('error with Weather API');
      });
  };

  const handleFilterChange = event => {
    setNewFilter(event.target.value);
    if (event.target.value !== '') {
      getCountries(event.target.value);
    }
  };

  const showCountry = country => {
    setNewFilter(country.name);
    setCountries([]);
    setCountry(country);
    setMessage('');
  };
  return (
    <div className="App">
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      {countries.length > 0 && <Countries countries={countries} showCountry={showCountry} />}
      {countries.length === 0 && country && weather && <Country country={country} weather={weather} />}
      {message && newFilter && <div>{message}</div>}
    </div>
  );
}

export default App;
