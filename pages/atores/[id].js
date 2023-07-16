import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link"
import React from "react"
import Pagina from "../../components/Pagina"
import { dateFormatter } from "../../functions/functions";
import ApiFIlmes from "../../ApiConnect/axiosAPIFilms"
import { Card, Col, Row } from "react-bootstrap";

const Detalhes = ({ ator, atorImagens, atorFilmesSeries }) => {

    return (
        <Pagina titulo={ator.name} title="Atores - Qaflix" navBarTitle="QAFLIX" navBarItem="films">
            <Row>
                <Col md={3}>
                    <Card>
                        <Card.Img variant="top" title={ator.name} src={(ator.profile_path == null) ? "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg?w=2000" : `https://image.tmdb.org/t/p/w500${ator.profile_path}`} />
                    </Card>
                </Col>

                <Col md={9}>
                    <p><b>Data de Nascimento: </b>{dateFormatter(ator.birthday)}</p>
                    <p><b>Local de Nascimento: </b>{ator.place_of_birth == null ? "O local de nascimento não foi informado." : ator.place_of_birth}</p>
                    {ator.deathday !== null ? <p><b>Data de Falecimento: </b>{dateFormatter(ator.deathday)}</p> : <></>}
                    <p>{ator.biography}</p>
                </Col>
            </Row>

            {!atorImagens == [] ?
                <Row>
                    <h2 className="pt-5">Fotos</h2>
                    {atorImagens.map((element,index) => (
                        <Col md={2} key={index}>
                            <Card.Img variant="top" title={ator.name} src={(element.file_path == null) ? "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg?w=2000" : `https://image.tmdb.org/t/p/w500${element.file_path}`} style={{ marginBottom: "20px" }}></Card.Img>
                        </Col>
                    ))}
                </Row>
                : <></>
            }

            {!atorFilmesSeries == [] ?
                <>
                    <Row>
                        <h2 className="pt-5">Filmes que atuou</h2>
                        {atorFilmesSeries.map((element,index)  => {
                            if (element.media_type == "movie") {
                                return (
                                    <Col md={2} key={index}>
                                        <Link href={'/films/' + element.id}>
                                            <Card.Img variant="top" title={element.title} src={(element.poster_path == null) ? "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg?w=2000" : `https://image.tmdb.org/t/p/w500${element.poster_path}`} style={{ marginBottom: "20px" }}></Card.Img>
                                        </Link>
                                    </Col>
                                )
                            }
                        })}
                    </Row>
                    <Row>
                        <h2 className="pt-5">Séries de TV que atuou</h2>
                        {atorFilmesSeries.map((element,index)  => {
                            if (element.media_type == "tv") {
                                return (
                                    <Col md={2} key={index}>
                                        <Link href={'/series/' + element.id}>
                                            <Card.Img variant="top" title={element.name} src={(element.poster_path == null) ? "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg?w=2000" : `https://image.tmdb.org/t/p/w500${element.poster_path}`} style={{ marginBottom: "20px" }}></Card.Img>
                                        </Link>
                                    </Col>
                                )
                            }
                        })}
                    </Row>
                </>
                : <></>
            }
        </Pagina>
    )
}

export default Detalhes
export async function getServerSideProps(context) {
    const id = context.params.id

    const resultadoAtor = await ApiFIlmes.get(`/person/${id}?&language=pt-BR`)
    const ator = resultadoAtor.data

    const resultadoImagensAtor = await ApiFIlmes.get(`/person/${id}/images`)
    const atorImagens = resultadoImagensAtor.data.profiles

    const resultadoFilmesSeriesAtor = await ApiFIlmes.get(`/person/${id}/combined_credits`)
    const atorFilmesSeries = resultadoFilmesSeriesAtor.data.cast

    return {
        props: { ator, atorImagens, atorFilmesSeries },
    }
}