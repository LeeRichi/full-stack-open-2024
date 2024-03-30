import { useState, useEffect } from 'react'
import axios from 'axios';
import Weather from './Weather'

function App()
{
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  console.log(filteredCountries[0]?.capital)

  useEffect(() =>
  {
    if (countries)
    {
      axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(
        response =>
        {
          setCountries(response.data)
        })
      .catch(
        error =>
        {
          console.error('Error occurred while fetching data:', error);          
        }
      )
    }
  }, [])

  useEffect(() => {
    setFilteredCountries(
      countries.filter(country =>
        country.name?.common?.toLowerCase().includes(inputValue?.toLowerCase())
      )
    );
  }, [inputValue, countries]);

  const handleCountryInput = (e) =>
  {
    setInputValue(e.target.value);
  }

  return (
    <>
      <div>find countries<input onChange={handleCountryInput} /></div>
      {filteredCountries.length > 10 ?
      (
        <p>Too many matches, specify another filter</p>
      ) :
      (
        filteredCountries.length === 1 ?
        (
          <div>
            <h2>{filteredCountries[0].name.common}</h2>
            <p>capital {filteredCountries[0].capital}</p>
            <p>area {filteredCountries[0].area}</p>
            <h3>languages:</h3>
            <ul>
              {Object.entries(filteredCountries[0].languages).map(([code, language]) => (
                <li key={code}>{language}</li>
              ))}
            </ul>
            <img src={filteredCountries[0].flags.svg} alt={`${filteredCountries[0].name.common}'s flag`} style={{ width: '100px', height: 'auto' }} />
            <Weather filteredCountries={filteredCountries} />
          </div>        
        ) :
        (
          <ul>
            {filteredCountries?.map((country, index) => <li key={index}>{country.name.common}</li>)}
          </ul>
        )
      )}
    </>
  )
}

export default App


