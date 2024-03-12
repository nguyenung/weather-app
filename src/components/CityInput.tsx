import axios from 'axios'
import { useState } from 'react'
import { WeatherData } from '../types/Weather'
import './CityInput.css'

type CityInputProps = {
  handleShowResults: (weatherData: WeatherData) => void
  toggleHasResult: (hasResults: boolean) => void
  handleClearResults: () => void
}
export default function CityInput({ handleShowResults, toggleHasResult, handleClearResults }: CityInputProps) {
  const [city, setCity] = useState('')
  const submitHandle = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    handleClearResults()
    const weatherData = await fetchWeatherData()
    const { city, list } = weatherData

    const forecastList = []
    const dayIndices = getDayIndices(weatherData)
    for (let i = 0; i < 5; i++) {
      forecastList.push({
        date: list[dayIndices[i]].dt_txt,
        weather_desc: list[dayIndices[i]].weather[0].description,
        icon: list[dayIndices[i]].weather[0].icon,
        temp: list[dayIndices[i]].main.temp
      })
    }

    handleShowResults({ city, forecastList: forecastList })

    toggleHasResult(true)
  }

  const fetchWeatherData = async () => {
    if (!city) {
      return false
    }
    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
          q: city,
          appid: '6557810176c36fac5f0db536711a6c52'
        }
      })
      return response.data
    } catch (error) {
      alert('Error fetching weather data.')
      throw new Error('Error fetching weather data.')
    }
  }

  const getDayIndices = (data: unknown) => {
    const dayIndices = []
    dayIndices.push(0)

    let index = 0
    let tmp = data.list[index].dt_txt.slice(8, 10)

    for (let i = 0; i < 4; i++) {
      while (tmp === data.list[index].dt_txt.slice(8, 10) || data.list[index].dt_txt.slice(11, 13) !== '15') {
        index++
      }
      dayIndices.push(index)
      tmp = data.list[index].dt_txt.slice(8, 10)
    }
    return dayIndices
  }

  return (
    <div className='city-form'>
      <form onSubmit={submitHandle}>
        <input
          type='text'
          className='city-input'
          placeholder='Enter a city...'
          value={city}
          onChange={(e) => {
            setCity(e.target.value)
            if (e.target.value === '') {
              toggleHasResult(false)
            }
          }}
        />
      </form>
    </div>
  )
}
