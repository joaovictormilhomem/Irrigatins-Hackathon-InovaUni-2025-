import type { Dispatch, SetStateAction } from "react"

export async function getWeather(lat: number, lon: number, setWeather: Dispatch<SetStateAction<boolean>>) {
  try {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric&lang=pt_br`
    const response = await fetch(weatherApiUrl)
    const weather = await response.json()
    setWeather(weather)
    // const description = weather.weather[0].description
    // const temperature = Math.round(weather.main.temp)
  } catch (error) {
    console.log(error)
    return ""
  }
}