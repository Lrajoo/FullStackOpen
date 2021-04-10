const Countries = props => {
  return props.countries.map(country => {
    return (
      <div key={country.name}>
        <div style={{ display: 'inline' }}>{country.name}</div>
        <button
          onClick={() => {
            props.showCountry(country);
          }}
          style={{ display: 'inline' }}
        >
          show
        </button>
      </div>
    );
  });
};

export default Countries;
