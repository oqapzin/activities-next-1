import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ApiFIlmes from '../../ApiConnect/axiosAPIFilms'
import Pagina from '../../components/Pagina';

const index = ({ filmes }) => {

    return (
        <>
            <Pagina titulo="Lançamentos (Sem dados na API)" title="Qaflix" navBarTitle="QAFLIX" navBarLink="/films" navBarItem="films">
            </Pagina>
        </>
    )
}

export default index


export async function getServerSideProps(context) {
    const resultado = await ApiFIlmes.get('/movie/latest')
    const filmes = resultado.data

    return {
        props: { filmes },
    }
}