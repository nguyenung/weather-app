import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CityInput from './components/CityInput'
import WeatherBox from './components/WeatherBox'
import { useState } from 'react'
import { CityType } from './types/City'
import { WeatherData } from './types/Weather'

export default function App() {
  const [city, setCity] = useState<CityType | null>(null)
  const [forecastList, setForecastList] = useState<Array<object> | null>(null)
  const [hasResult, setHasResult] = useState<boolean>(false)
  const handleShowResults = (data: WeatherData) => {
    setCity(data.city)
    setForecastList(data.forecastList)
  }
  const toggleHasResult = (hasResultVal: boolean) => {
    setHasResult(hasResultVal)
  }

  const handleClearResults = () => {
    setCity(null)
    setForecastList(null)
    setHasResult(false)
  }

  return (
    <div id='forecast-app' className={hasResult ? 'has-results' : ''}>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1 className='page-title'>Weather Forecast</h1>
      <div className='card'>
        <CityInput
          handleShowResults={handleShowResults}
          toggleHasResult={toggleHasResult}
          handleClearResults={handleClearResults}
        />
        <WeatherBox city={city} forecastList={forecastList} />
      </div>
    </div>
  )
}
