import { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import { useParams } from "react-router-dom"

const URL = "https://api.openweathermap.org/data/2.5/forecast?q="
const urlKey = "&appid=d304fba74956531f3fe09c3644b753eb"

const DetailsCard = function () {
  const { cityName } = useParams()
  const [data, setData] = useState(null)
  const [dataImg, setDataImg] = useState(null)

  const getMeteo = () => {
    if (!cityName) return
    fetch(URL + cityName + urlKey)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Errore nella chiamata")
        }
      })
      .then((data) => {
        console.log(data)
        setData(data)
      })
      .catch((err) => {
        console.log("Errore nei data", err)
      });
  };

  useEffect(() => {
    getMeteo()
  }, [cityName])

  const getMeteoImg = () => {
    if (!cityName) return;
    const URL2 = "https://api.pexels.com/v1/search?query="
    fetch(URL2 + cityName + "&per_page=1&page=1", {
      headers: {
        Authorization:
          "TRqDc8JVUsAUANm3pY4t1DhcLKXD7HKnBloKCvnFa7weEUksG0zTMstM",
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Errore nella fetch")
        }
      })
      .then((dataImg) => {
        console.log(dataImg);
        setDataImg(dataImg);
      })
      .catch((err) => {
        console.log("Errore nella promise", err)
      })
  }

  useEffect(() => {
    getMeteoImg()
  }, [cityName])

  if (!data || !dataImg) {
    return <div className="d-flex justify-content-center"></div>;
  }

  const filterMeteoData = (list) => {
    const filteredList = []
    let dayCounter = 0

    for (let i = 0; i < list.length && dayCounter < 3; i++) {
      const time = list[i].dt_txt.split(' ')[1];
      if (time === '09:00:00' || time === '15:00:00' || time === '21:00:00') {
        filteredList.push(list[i])
        dayCounter++
      }
    }
    return filteredList
  }

  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col className="col-8 w-100 col-lg- col-md-6 col-xs-4">
            {dataImg && dataImg.photos && dataImg.photos[0] && (
              <>
              
                <Container>
                  <Row className="d-flex justify-content-center">
                    <Col className="col-8 w-100 col-lg-10 col-md-6 col-xs-4">
                      <Card>
                        <Card.Img
                          variant="top"
                          src={dataImg.photos[0].src.original}
                          alt="Città"
                          className="img-fluid mb-3"
                        />
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </>
            )}
            <div >
              {filterMeteoData(data.list).map((meteo) => {
                const tempmaxC = (meteo.main.temp_max - 273.15).toFixed(2)
                const tempminC = (meteo.main.temp_min - 273.15).toFixed(2)
                const iconCode = meteo.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

                return (
                  <Container>
      <Row className="justify-content-center"> 
        <Col xs={10} md={8} lg={6}> 
          <Card key={meteo.dt} className="my-2 custom-bg-purple">
            <Card.Body className="text-center">
              <Card.Title>{data.city.name}</Card.Title>
              <div>Temperatura:</div>
              <div className="d-flex justify-content-evenly">
                <div className="fs-5 fw-bold">
                  Massima {tempmaxC}°C{" "}
                  <img
                    src={iconUrl}
                    alt={meteo.weather[0].description}
                    className="weather-icon"
                  />
                </div>
                <div className="fs-5 fw-bold">
                  Minima {tempminC}°C{" "}
                  <img
                    src={iconUrl}
                    alt={meteo.weather[0].description}
                    className="weather-icon"
                  />
                </div>
              </div>
              <br />
              Orario: {meteo.dt_txt}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
                )
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default DetailsCard