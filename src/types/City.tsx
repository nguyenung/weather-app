type CoordType = {
  lat: number
  lon: number
}

export type CityType = {
  coord: CoordType
  country: string
  id: number
  name: string
  population: number
  sunrise: number
  sunset: number
  timezone: number
}
