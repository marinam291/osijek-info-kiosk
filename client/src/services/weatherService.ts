export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

export async function getOsijekWeather(): Promise<WeatherData> {
  try {
    const lat = 45.5511;
    const lon = 18.6939;

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`,
    );
    const data = await response.json();

    const temp = Math.round(data.current.temperature_2m);
    const weatherCode = data.current.weather_code;

    let condition = "Sunčano";
    let icon = "sun";

    if (weatherCode >= 1 && weatherCode <= 3) {
      condition = "Mjestimično oblačno";
      icon = "cloud";
    } else if (weatherCode >= 51 && weatherCode <= 67) {
      condition = "Kiša";
      icon = "cloud-rain";
    } else if (weatherCode >= 95) {
      condition = "Grmljavina";
      icon = "cloud-lightning";
    }

    return {
      temperature: temp,
      condition,
      icon,
    };
  } catch {
    return {
      temperature: 25,
      condition: "Sunčano",
      icon: "sun",
    };
  }
}
