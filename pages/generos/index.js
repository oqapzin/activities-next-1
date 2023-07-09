import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import apiFilmes from '../ApiConnect/axiosAPIFilms'
import Pagina from '../../components/Pagina';
import Link from 'next/link';

const index = (props) => {

    return (
        <>
            <Pagina titulo="Gêneros" title={"Qaflix"} navBarLink="/films" navBarItem="films">
                <h2 className="pt-5">Filmes</h2>
                {props.filmsGeneros.map(item => (
                    <Link key={item.id} href={{
                        pathname: `/generos/${item.id}`,
                        query: { name: item.name, type: "film" },
                    }} className="btn btn-warning mx-2 my-2 text-center">{item.name}</Link>
                ))}


                <h2 className="pt-5">Séries</h2>
                {props.seriesGeneros.map(item => (
                    <Link key={item.id} href={{
                        pathname: `/generos/${item.id}`,
                        query: { name: item.name, type: "tv" },
                    }} className="btn btn-warning mx-2 my-2 text-center">{item.name}</Link>
                ))}
            </Pagina>
        </>
    )
}

export default index

export async function getServerSideProps(context) {
    const resultadoFilms = await apiFilmes.get('/genre/movie/list?&language=pt-BR')
    const filmsGeneros = resultadoFilms.data.genres

    const resultadoSeries = await apiFilmes.get('/genre/tv/list?&language=pt-BR')
    const seriesGeneros = resultadoSeries.data.genres
    return {
        props: { filmsGeneros, seriesGeneros },
    }
}