import { CityType } from './City'

export type WeatherData = {
  city: CityType
  forecastList: Array<object>
}
