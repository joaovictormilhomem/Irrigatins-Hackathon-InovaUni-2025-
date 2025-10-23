/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Dispatch, SetStateAction } from "react"

export async function getWeather(lat: number, lon: number, setWeather: Dispatch<SetStateAction<boolean>>) {
  try {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric&lang=pt_br&cnt=6`
    const response = await fetch(weatherApiUrl)
    const weather = await response.json()
    setWeather(weather)
    // const description = weather.weather[0].description
    // const temperature = Math.round(weather.main.temp)
  } catch (error) {
    alert("Algo deu errado na busca dos dados de clima: " + error)
    return ""
  }
}

export function getTemperatures(data: any): { minTemp: number, maxTemp: number } {
  // Mapeia a lista para extrair apenas os valores de temp_min e temp_max
  const minTemps = data.list.map((item: { main: { temp_min: any } }) => item.main.temp_min)
  const maxTemps = data.list.map((item: { main: { temp_max: any } }) => item.main.temp_max)

  // Calcula a menor temperatura mínima de todo o período
  // O Math.min com o operador spread (...) encontra o menor valor no array.
  const minTemp = Math.min(...minTemps)

  // Calcula a maior temperatura máxima de todo o período
  // O Math.max com o operador spread (...) encontra o maior valor no array.
  const maxTemp = Math.max(...maxTemps)

  // Retorna um objeto com os resultados
  return {
    minTemp,
    maxTemp,
  }
}