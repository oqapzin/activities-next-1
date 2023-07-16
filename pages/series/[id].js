import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link"
import React, { useState } from "react"
import Pagina from "../../components/Pagina"
import ApiFIlmes from "../../ApiConnect/axiosAPIFilms"
import { Accordion, Button, Card, Col, Modal, Row, Table } from "react-bootstrap";
import { dateFormatter } from "../../functions/functions";

const Detalhes = ({ series, creditosSeries }) => {
series.seasons
  const [show, setShow] = useState(false);
  const [temporada, setTemporada] = useState({});

  const handleClose = () => setShow(false);

  async function handleShow(season_number) {
    const temporada = await ApiFIlmes.get(`/tv/${series.id}/season/${season_number}`)
    setTemporada(temporada.data)
    setShow(true);
  }

  return (
    <Pagina titulo={series.name} title={"Qaflix"} navBarLink="/series" navBarItem="films">
      <Row>

        <Col md={3}>
          <Card>
            <Card.Img variant="top" title={series.name} src={(series.poster_path == null) ? "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg?w=2000" : `https://image.tmdb.org/t/p/w500${series.poster_path}`} />
          </Card>
        </Col>

        <Col md={9}>
          <p><b>Data de Lançamento: </b>{dateFormatter(series.first_air_date)}</p>
          <p><b>Último episódio: </b>{dateFormatter(series.last_air_date)}</p>
          <p><b>Número de episódios: </b>{series.number_of_episodes}</p>
          <p><b>Popularidade: </b>{series.popularity}</p>
          <p><b>Status: </b>{series.status}</p>
          <ul>
            {series.genres.map(element => (
              <Link key={element.id} className="text-decoration-none" href={{
                pathname: `/generos/${element.id}`,
                query: { name: element.name, type: "tv" },
              }}>
                <li className="text-primary">{element.name}</li>
              </Link>
            ))}
          </ul>
        </Col>
      </Row>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{temporada.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={4}>
              <Card.Img variant="top" src={'https://image.tmdb.org/t/p/w500/' + temporada.poster_path} />
            </Col>
            <Col md={8}>
              <Accordion defaultActiveKey="0">
                {temporada.episodes && temporada.episodes.map(item => (
                  <Accordion.Item key={item.id} eventKey={item.id}>
                    <Accordion.Header>{item.name}</Accordion.Header>
                    <Accordion.Body>
                      <Card className="mb-3">
                        {item.still_path &&
                          <Card.Img variant="top" src={'https://image.tmdb.org/t/p/w500/' + item.still_path} />
                        }
                        <Card.Body>
                          {item.overview}
                        </Card.Body>
                      </Card>

                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      <h2 className='mt-3'>Temporadas</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Capa</th>
            <th>Temporada</th>
            <th>Episódios</th>
            <th>Sinopse</th>
          </tr>
        </thead>
        <tbody>
          {series.seasons.map(item => (

            <tr key={item.id}>
              <td width="10%">
                <Card.Img onClick={() => handleShow(item.season_number)} variant="top" src={'https://image.tmdb.org/t/p/w500/' + item.poster_path} />
              </td>
              <td width="15%">{item.name}</td>
              <td width="5%">{item.episode_count}</td>
              <td>{item.overview}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Row>
        <h2 className="pt-5">Atores</h2>
        {creditosSeries.map(element => (
          <Col key={element.id} md={2}>
            <Link  href={`/atores/${element.id}`}>
              <Card.Img variant="top" title={element.name} src={(element.profile_path == null) ? "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg?w=2000" : `https://image.tmdb.org/t/p/w500${element.profile_path}`} style={{ marginBottom: "20px" }}></Card.Img>
            </Link>
          </Col>
        ))}
      </Row>
    </Pagina>
  )
}

export default Detalhes
export async function getServerSideProps(context) {
  const id = context.params.id

  const resultado = await ApiFIlmes.get(`/tv/${id}"?&language=pt-BR`)
  const series = resultado.data

  const resultadoCreditosSeries = await ApiFIlmes.get(`/tv/${id}/credits`)
  const creditosSeries = resultadoCreditosSeries.data.cast


  return {
    props: { series, creditosSeries },
  }
}