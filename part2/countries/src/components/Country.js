const Country = props => {
  return (
    <>
      <h3>{props.country.name}</h3>
      <h6>capital {props.country.capital}</h6>
      <h6>population {props.country.population}</h6>
      <h4>Spoken Languages</h4>
      <ul>
        {props.country.languages.map(language => {
          return <li key={language.name}>{language.name}</li>;
        })}
      </ul>
      <img src={props.country.flag} height="100px" alt="Flag" />
      <h4>Weather in {props.country.capital}</h4>
      <h6>temperature: {props.weather.temperature} Celcius</h6>
      <img src={props.weather.weather_icons[0]} height="50px" alt="Weather" />
      <h6>
        wind: {props.weather.wind_speed} mph direction {props.weather.wind_dir}
      </h6>
    </>
  );
};

export default Country;
