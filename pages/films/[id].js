import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link"
import React from "react"
import Pagina from "../../components/Pagina"
import apiFilmes from "../ApiConnect/axiosAPIFilms"
import { Card, Col, Row } from "react-bootstrap";
import { dateFormatter, numberFormatter, timeFormatter } from "../../functions/functions";

const Detalhes = ({ filme, creditosFilmes }) => {

  return (
    <Pagina titulo={filme.title} title="Qaflix" navBarTitle="QAFLIX" navBarLink="/films" navBarItem="films">
      <Row>
        <Col md={3}>
          <Card>
            <Card.Img variant="top" title={filme.title} src={(filme.poster_path == null) ? "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg?w=2000" : `https://image.tmdb.org/t/p/w500${filme.poster_path}`} />
          </Card>
        </Col>

        <Col md={9}>
          <p><b>Data de Lançamento: </b>{dateFormatter(filme.release_date)}</p>
          <p><b>Orçamento: </b>{numberFormatter(filme.budget)}</p>
          <p><b>Duração: </b>{timeFormatter(filme.runtime)}</p>
          <p><b>Nota: </b>{filme.vote_average}</p>
          <ul>
            {filme.genres.map(element => (
              <Link className="text-decoration-none" key={element.id} href={{
                pathname: `/generos/${element.id}`,
                query: { name: element.name, type: "film" },
              }}>
                <li className="text-primary">{element.name}</li>
              </Link>
            ))}
          </ul>
        </Col>
      </Row>

      <Row>
        <h2 className="pt-5">Atores</h2>
        {creditosFilmes.map(element => (
          <Col key={element.id} md={2}>
            <Link key={element.id} href={`/atores/${element.id}`}>
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

  const resultado = await apiFilmes.get(`/movie/${id}?&language=pt-BR`)
  const filme = resultado.data

  const resultadoCreditosFilmes = await apiFilmes.get(`/movie/${id}/credits`)
  const creditosFilmes = resultadoCreditosFilmes.data.cast

  return {
    props: { filme, creditosFilmes },
  }
}