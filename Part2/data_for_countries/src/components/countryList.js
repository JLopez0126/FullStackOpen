  
  import React from 'react';
  import Weather from './weather'
  
  //Returning Country Details
  const CountryDetails = ({ country }) => {

    return (
        <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Language{country.languages.length > 1 ? "s" : ""}</h2>
            <ul>
                {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
            </ul>
            <img src={country.flag} alt={"flag of " + country.name} width="200" />
            <h2>Weather in {country.capital}</h2>
            <Weather city={country.name} />
        </div>
    );
}

//Printing List of countries
const List = ({ countries, setCountry }) => {
  return (
      <div>
          {countries.map(country => {
              return <p key={country.name}> {country.name} <button onClick={() => setCountry(country.name)}>show</button></p>
          })}
      </div>
  );
}

  
  
  //Result from The Server
  const Result = ({ data, setCountry }) => {
    if (data.length === 0) {
      return (
        <div>
          Empty Search
        </div>
      );
    } else if (data.length === 1) {
      return <CountryDetails country={data[0]} />
    } else if (data.length < 10) {
      return <List countries={data} setCountry={setCountry} />;
    } else {
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    }
  }

  export default Result