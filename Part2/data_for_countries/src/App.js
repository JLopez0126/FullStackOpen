import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import Result from './components/countryList'


const App = () => {
  const [country, setCountry] = useState('');
  const [data, setData] = useState([]);

  const handleCountryChange = (event) => {
    console.log(event.target.value)
    setCountry(event.target.value)
  }

  //Fetching data from server
  useEffect(() => {
    console.log('effect')
    if (country.length > 0) {
    axios
      .get('https://restcountries.eu/rest/v2/name/'+ country)
      .then(response => {
        setData(response.data)
        console.log(response.data)
      })
  }  else {
    setData([]);
  }
}, [country]);

return (
  <div>
    Find countries : <input value={country} onChange={handleCountryChange} />
    <Result data={data} setCountry={setCountry} />
  </div>
)
}

export default App;
