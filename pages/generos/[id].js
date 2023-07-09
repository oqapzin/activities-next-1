import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import apiFilmes from '../ApiConnect/axiosAPIFilms'
import Pagina from '../../components/Pagina';
import ItemGaleria from '@/components/ItemGaleria';

const index = ({ films, name, type }) => {

    return (
        <>
            {type == "film" ?
                <Pagina titulo={name} title={"Qaflix"} navBarLink="/films" navBarItem="films">
                    <ItemGaleria
                        arrayName={films}
                        photoName="backdrop_path"
                        photoLinkName="https://image.tmdb.org/t/p/w500"
                        titleName="original_title"
                        primaryText="Data de lançamento:"
                        primaryTextFormatter="dateFormatter"
                        primaryTextName="release_date"
                        secondaryText="Popularidade:"
                        secondaryTextName="vote_average"
                        linkId="id"
                        linkName="films"
                    />
                </Pagina>

                :
                
                <Pagina titulo={name} title={"Qaflix"} navBarLink="/series" navBarItem="films">
                    <ItemGaleria
                        arrayName={films}
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
            }

        </>
    )
}

export default index

export async function getServerSideProps(context) {
    const id = context.params.id
    const name = context.query.name
    const type = context.query.type

    const resultado = await apiFilmes.get(type == "film" ? `/discover/movie?&with_genres=${id}&language=pt-BR` : `/discover/tv?&with_genres=${id}&language=pt-BR`)
    const films = resultado.data.results

    return {
        props: { films, name, type },
    }
}