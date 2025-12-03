import React from 'react';

const styles = {
  page: {
    margin: 0,
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to right, #cce4f7, #a3b5d3)',
    padding: '16px',
    zIndex: 0,
  },
  container: {
    background: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '12px',
    padding: '32px',
    maxWidth: '768px',
    width: '100%',
  },
  h1: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1d4ed8',
    textAlign: 'center',
    marginBottom: '24px',
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#2563eb',
    marginBottom: '16px',
  },
  p: {
    fontSize: '1rem',
    color: '#4b5563',
    marginBottom: '16px',
  },
  list: {
    paddingLeft: '1.5rem',
    marginBottom: '24px',
    color: '#4b5563',
  },
  button: {
    padding: '10px 20px',
    marginTop: '20px',
    fontSize: '1rem',
    borderRadius: '5px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  footer: {
    textAlign: 'center',
    marginTop: '32px',
    color: '#6b7280',
  },
};

export default function About() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.h1}>About Weather Prediction App</h1>

        <p style={styles.p}>
          Welcome to the Weather Prediction App — your simple, fast, and reliable source for real-time weather information! 🌦️
        </p>

        <h2 style={styles.h2}>What This App Does?</h2>
        <ul style={styles.list}>
          <li>🔎 Search for any city worldwide and get accurate weather updates.</li>
          <li>📅 View the current conditions as well as 3-day weather forecasts.</li>
          <li>🗺️ Autocomplete feature for easy city selection based on what you type.</li>
          <li>🛡️ User authentication to provide a personalized experience.</li>
          <li>☁️ Stores searched weather data for future analysis and improvements.</li>
        </ul>

        <h2 style={styles.h2}>Technologies Used</h2>
        <ul style={styles.list}>
          <li>⚛️ React.js for dynamic frontend UI</li>
          <li>🌐 Axios for API calls</li>
          <li>📡 WeatherAPI.com for fetching real-time weather data</li>
          <li>🎨 Bootstrap & TailwindCSS for modern, responsive styling</li>
          <li>🛢️ MongoDB for saving user search history</li>
        </ul>

        <h2 style={styles.h2}>Why We Built This?</h2>
        <p style={styles.p}>
          Our mission is to deliver fast, accessible weather updates to users around the world, helping them plan their day better and stay informed about changing weather conditions. Whether you're heading to work, planning a trip, or just curious, this app makes it easy and fun to check the forecast anytime, anywhere!
        </p>

        <button style={styles.button} onClick={() => window.history.back()}>
          Back
        </button>

        <div style={styles.footer}>
          <p>Made with ❤️ by Weather Enthusiasts</p>
        </div>
      </div>
    </div>
  );
}