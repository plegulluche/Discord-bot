export interface ForecastData {
    date: string;
    temperatureMinC: number;
    temperatureMaxC: number;
    temperatureMinF: number;
    temperatureMaxF: number;
    sunriseTime: string;
    sunsetTime: string;
    moonriseTime: string;
    moonsetTime: string;
  }
  
  export interface ForecastResponse {
    locationName: string;
    weatherData: ForecastData[];
  }