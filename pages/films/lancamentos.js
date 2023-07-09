import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import apiFilmes from '../ApiConnect/axiosAPIFilms'
import Pagina from '../../components/Pagina';

const index = ({ filmes }) => {

    return (
        <>
            <Pagina titulo="Lançamentos (Sem dados na API)" title={"Qaflix"} navBarLink="/films" navBarItem="films">
            </Pagina>
        </>
    )
}

export default index


export async function getServerSideProps(context) {
    const resultado = await apiFilmes.get('/movie/latest')
    const filmes = resultado.data

    return {
        props: { filmes },
    }
}