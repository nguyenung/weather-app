import { CityType } from '../types/City'
import './WeatherBox.css'

type WeatherBoxProps = {
  city: CityType | null
  forecastList: Array<object> | null
}
export default function WeatherBox({ city, forecastList }: WeatherBoxProps) {
  let cityText = ''
  if (city) {
    cityText = city.name
  }
  if (!forecastList) {
    return <></>
  }
  function uppercaseFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  function kenvilToCelsius(kenvil: number) {
    const sub = kenvil - 273.15
    if (Number.isInteger(sub)) {
      return sub
    } else {
      const formatted = sub.toFixed(1)
      return parseFloat(formatted).toString()
    }
  }
  const todayWeather = forecastList[0]
  const nextWeathers = forecastList.slice(1)
  const nextWeathersElm = nextWeathers.map((weather: Array<object>) => {
    return (
      <li key={weather.date}>
        <div className='next-weather-box'>
          <span className='next-days'>{weather.date.substring(0, 11)}</span>
          <img src={`https://openweathermap.org/img/wn/${todayWeather.icon}@2x.png`} />
          <br />
          <span>{kenvilToCelsius(weather.temp)} &#8451;</span>
          <br />
          <span>{uppercaseFirstLetter(weather.weather_desc)}</span>
        </div>
      </li>
    )
  })
  return (
    <>
      <div id='today-item'>
        <img src={`https://openweathermap.org/img/wn/${todayWeather.icon}@2x.png`} />
        <div id='today-detail'>
          <span className='today-label'>Today</span>
          <h2 className='city-name'>{cityText}</h2>
          <span className='today-weather-detail'>
            {kenvilToCelsius(todayWeather.temp)} &#8451; - {uppercaseFirstLetter(todayWeather.weather_desc)}
          </span>
          <br />
        </div>
      </div>
      <div className='next-weather-list'>
        <ul>{nextWeathersElm}</ul>
      </div>
    </>
  )
}
