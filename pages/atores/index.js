import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ApiFIlmes from '../../ApiConnect/axiosAPIFilms'
import Pagina from '../../components/Pagina';
import ItemGaleria from '@/components/ItemGaleria';

const index = ({ atores }) => {
    return (
        <>
            <Pagina titulo="Atores do momento" navBarTitle="QAFLIX" title="Qaflix">
                <ItemGaleria
                    arrayName={atores}
                    photoName="profile_path"
                    photoLinkName="https://image.tmdb.org/t/p/w500"
                    titleName="name"
                    linkId="id"
                    linkName="atores"
                />
            </Pagina>
        </>
    )
}

export default index


export async function getServerSideProps(context) {
    const resultado = await ApiFIlmes.get('/person/popular')
    const atores = resultado.data.results

    return {
        props: { atores },
    }
}