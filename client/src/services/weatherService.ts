export interface DailyForecast {
  day: string;
  temp: string;
  icon: string;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  weekly?: DailyForecast[];
}

export async function getOsijekWeather(): Promise<WeatherData> {
  try {
    const lat = 45.5511;
    const lon = 18.6939;
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,weather_code&timezone=Europe/Zagreb`,
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

    const daysHR = ["NED", "PON", "UTO", "SRI", "ČET", "PET", "SUB"];
    const weekly: DailyForecast[] = data.daily.time.map(
      (dateStr: string, index: number) => {
        const date = new Date(dateStr);
        const dayIndex = date.getDay();
        const maxTemp = Math.round(data.daily.temperature_2m_max[index]);
        const code = data.daily.weather_code[index];

        let dIcon = "sun";
        if (code >= 1 && code <= 3) dIcon = "cloud";
        else if (code >= 51 && code <= 67) dIcon = "cloud-rain";
        else if (code >= 95) dIcon = "cloud-lightning";

        return {
          day: daysHR[dayIndex],
          temp: `${maxTemp}°C`,
          icon: dIcon,
        };
      },
    );

    return {
      temperature: temp,
      condition,
      icon,
      weekly,
    };
  } catch {
    return {
      temperature: 37,
      condition: "Sunčano",
      icon: "sun",
    };
  }
}
