import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import apiFilmes from '../ApiConnect/axiosAPIFilms'
import Pagina from '../../components/Pagina';
import ItemGaleria from '@/components/ItemGaleria';

const index = (props) => {

    return (
        <>
            <Pagina titulo="Séries" title={"Qaflix"} navBarLink="/" navBarItem="films">
                <ItemGaleria
                    arrayName={props.series}
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
    const resultado = await apiFilmes.get('/tv/popular?&language=pt-BR')
    const series = resultado.data.results

    return {
        props: { series },
    }
}