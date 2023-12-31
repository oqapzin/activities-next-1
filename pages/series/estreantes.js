import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ApiFIlmes from '../../ApiConnect/axiosAPIFilms'
import Pagina from '../../components/Pagina';
import ItemGaleria from '@/components/ItemGaleria';

const index = ({ filmes }) => {

    return (
        <>
            <Pagina titulo="Séries Estreantes" title={"Qaflix"} navBarLink="/series" navBarItem="films">
                <ItemGaleria
                    arrayName={filmes}
                    photoName="backdrop_path"
                    photoLinkName="https://image.tmdb.org/t/p/w500"
                    titleName="name"
                    primaryText="Data de lançamento:"
                    primaryTextFormatter="dateFormatter"
                    primaryTextName="first_air_date"
                    secondaryText="Popularidade:"
                    secondaryTextName="vote_average"
                    linkId="id"
                    linkName="series"

                />
            </Pagina>
        </>
    )
}

export default index


export async function getServerSideProps(context) {
    const resultado = await ApiFIlmes.get('/tv/airing_today?&language=pt-BR`')
    const filmes = resultado.data.results

    return {
        props: { filmes },
    }
}