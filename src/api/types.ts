export type City = {
  coord: {
    lon: number
    lat: number
  }
  country: string
  id: number
  name: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}

export type Coordinates = {
  lon: string
  lat: string
}
