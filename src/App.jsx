import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
// fix imports (relative to src)
import Current from "../Components/Current";
import ForeCast from "../Components/ForeCast";
// use package import for bootstrap
import "bootstrap/dist/js/bootstrap";
import About from "./About";
import FeedBack from "./FeedBack";
// import background image instead of absolute Windows path
import skyImg from "./sky.jpg";


export default function App() {
  const [city, setCity] = useState();
  const [ClickedCity, setClickedCity] = useState();
  const [citySuggestion, setCitySuggestion] = useState([]);
  const [currentWeather, setCurrent] = useState();
  const [forecastWeather, setForecast] = useState();
  const [location, setLocation] = useState();

  // add simple hash-based routing state
  const [route, setRoute] = useState(window.location.hash || '');

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || '');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // show the related typed cities when typing, for the purpose of autocomplete
  const autoCompURl =
    "https://api.weatherapi.com/v1/search.json?key=83c0b17cb2774eac95723527231501&q=";

  // API for typed city
  const weatherURL = (city) => `https://api.weatherapi.com/v1/forecast.json?key=83c0b17cb2774eac95723527231501&q=${city}&days=7&aqi=no&alerts=no`;

  // autocomplete when the city's length is >3
  useEffect(() => {
    if (city && city.length > 3) {
      fetchAutoCompAPI();
    }
  }, [city]);

  // fetch the API for autocomplete when the client was typed
  const fetchAutoCompAPI = async () => {
    try {
      const response = await axios.get(autoCompURl + city);
      const resp = response.data;
      console.log(resp);

      const cityData = resp.map((data) => {
        return `${data.name},${data.region},${data.country}`;
      });

      // set the suggest city similar to the typed city
      setCitySuggestion(cityData);
    } catch (e) {
      console.log("error", e);
    }
  };

  // after cliked and typed set the city in search bar 
  const handleselectedcity = (city) => {
    console.log('Clicked city', city);
    setClickedCity(city);
    fetchWeatherAPI(city);
    // after seleted the city ,city Suggestion is closed
    setCitySuggestion([])
  }

  // fetch the API for clicked and typed city
  const fetchWeatherAPI = async (city) => {
    try {
      const response = await axios.get(weatherURL(city));
      if (response.status !== 200) {
        throw new Error("Weather API request failed");
      }
      const resp = response.data;

      setCurrent(resp.current);
      setForecast(resp.forecast);
      setLocation(resp.location);

      // Send data to MongoDB
      const saveResponse = await axios.post("http://localhost:5000/save-weather", {
        city: resp.location.name,
        temperature: resp.current.temp_c,
        weather: resp.current.condition.text,
      });

      if (saveResponse.status === 201) {
        console.log("Weather data saved successfully!");
      } else {
        console.warn("Failed to save data.");
      }
    } catch (e) {
      console.error("Error fetching or saving weather data:", e);
    }
  };

  // const fetchWeatherAPI=(city)=>{
  //   const respon= axios.get(weatherURL(city))
  // }

  // --- Move route checks to here, after all hooks/effects ---
  if (route === '#about') {
    return <About />;
  }
  if (route === '#feedback') {
    return <FeedBack />;
  }

  return (
    <div className="container #646cffaa p-5 mt-3 rounded" style={{
      cursor: 'default',
      // use imported image URL
      backgroundImage: `url(${skyImg})`,
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundColor: '#646cffaa',
      backgroundBlendMode: 'overlay',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh'
    }}>
      <div className="text-white"><h1>🌦 Weather Prediction</h1></div>

      {/* use hash navigation for About, keep feedback as static html link */}
      <button
        className="btn btn-light position-absolute top-0 end-0 m-2"
        onClick={() => (window.location.hash = 'about')}
      >
        About
      </button>
      <button
        className="btn btn-light position-absolute top-0 start-0 m-4"
        onClick={() => (window.location.hash = 'feedback')}
      >
        FeedBack
      </button>



      <p>Enter your location to get real-time weather updates!</p>
      <input
        type="text"
        value={ClickedCity}
        className="form-control"
        placeholder="Enter city name"
        onChange={(e) => {
          setCity(e.target.value);

          // if the search bar is empty hide all the component like (current,forecast and location)
          if (e.target.value === "" && e.target.value.length < 4) {
            setCurrent();
            setForecast();
            setClickedCity();
            setLocation();
            setCitySuggestion([]);
          }
        }}
      />


      {/* {city && <h4>{city}</h4>} */}

      {/* suggest the city similar to the typed city */}
      {citySuggestion &&
        citySuggestion.map((city, index) => {
          return (
            <div key={index} className="text-center bg-info rounded p-1 bg-opacity-10 border border-info border-opacity-25 text-white" style={{ cursor: 'pointer' }} onClick={() => handleselectedcity(city)}>
              {city}
            </div>
          );
        })}

      {/* pass the props */}

      {currentWeather && <Current currentWeather={currentWeather} location={location} />}
      {forecastWeather && <ForeCast forecastWeather={forecastWeather} location={location} />}


    </div>
  );

}
