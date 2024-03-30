/* eslint-disable no-undef */
import { useState, useEffect } from "react"
import axios from "axios"

const api_key = import.meta.env.VITE_SOME_KEY
console.log(api_key)

const Weather = (filteredCountries) =>
{
    const [allWeather, setAllWeather] = useState(null)

    const capital = filteredCountries?.filteredCountries?.[0]?.capital; //destructure
    
    useEffect(() =>
    {
        if (capital)
        {
            axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital[0]}&appid=${api_key}`)
            .then(response => {
                console.log(response.data)
                setAllWeather(response.data)
            })
            .catch(error =>
                {
                    console.error('Error occurred while fetching data:', error);          
                }
            )
        }
    },[])

    if (allWeather === null) return null
    
    return (
        <div>
            <h2>weather in {capital[0]}
            </h2>    
            <p>{`tempeature ${(allWeather.main.temp - 273.5).toFixed(2)} Celcius`}</p>
            <img alt="weather icon" src={`http://openweathermap.org/img/wn/${allWeather.weather[0].icon}@2x.png`} />
            <p>{`wind ${allWeather.wind.speed} m/s`}</p> 
        </div>
    )
}

export default Weather