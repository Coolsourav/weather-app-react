import React, { useEffect, useState } from "react";
import "./weather.css";
import Umbrella from "./umbrella.png"
import sun from "./sun.png"

export default function WeatherApp() {
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [input, setInput] = useState("");
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (search && input) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=06642756b178ed8e02a57997c3e7476c`
      )
        .then((response) => response.json())
        .then((data) => {
          setLocation(data.name);
          const temperatureInCelsius = data.main.temp - 273.15;
          setTemperature(temperatureInCelsius);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [search, input]);

  const handleInput = (e) => {
    e.preventDefault();
    setSearch(true);
  };

  return (
    <>
      <section className="hero ">
        <div className="col-4 left border border-secondary">
          <h2 className="text-end">Weather App</h2>
          <img className="umbrella" src={Umbrella} alt="img" />
          <h3>Breeze</h3>
        </div>
        <div className="right col-4 border border-secondary">
          <form onSubmit={handleInput} style={{ width: "80%" }}>
            <input
              type="text"
              value={input}
              placeholder="Search for cities"
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
          <div className="col d-flex align-items-center">
            <div>
              {location && <h1 className="text-center">{location}</h1>}
              {temperature && (
                <p className="text-center">{`${Math.floor(
                  temperature
                )}\u00B0 Celsius`}</p>
              )}
            </div>
            <div>{location && <img src={sun} className="sun" alt="img" />}</div>
          </div>
        </div>
      </section>
    </>
  );
}
