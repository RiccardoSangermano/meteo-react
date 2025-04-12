import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Image } from 'react-bootstrap'

function Home() {
  const [citiesData, setCitiesData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const apiKey = 'aa6354ec4cfda784e7dcdf2964902721'
    const cities = ['Torino', 'Roma', 'Napoli', 'Bologna']

    const fetchWeatherData = (city) => {
      return fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      ).then((response) => {
        if (!response.ok) {
          throw new Error(`Impossibile recuperare i dati meteo di ${city}.`)
        }
        return response.json()
      });
    };

    Promise.all(cities.map(fetchWeatherData))
      .then((data) => setCitiesData(data))
      .catch((err) => setError(err.message))
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        {citiesData.map((cityData) => (
          <Col key={cityData.id} xs={12} md={6} lg={2}>
            <Card className="mb-4" style={{ backgroundColor: '#b601d2bf', color: 'white' }}>
              <Card.Body>
                <Card.Title>Meteo a {cityData.name}</Card.Title>
                <Image
                  src={`http://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`}
                  alt={cityData.weather[0].description}
                  fluid
                  className="mb-2"
                />
                <Card.Text>
                  Temperatura: {cityData.main.temp}°C
                </Card.Text>
                <Card.Text>
                  Condizioni: {cityData.weather[0].description}
                </Card.Text>
                <Link
                  to={`/details/${cityData.name}`}
                  className="btn btn-primary rounded-pill d-flex justify-content-center"
                  style={{ backgroundColor: '#4B0082', color: 'white', border: '#b601d2bf' }}
                >
                  Dettagli
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {error && <div className="mt-3 text-danger">Errore: {error}</div>}
    </Container>
  );
}

export default Home;