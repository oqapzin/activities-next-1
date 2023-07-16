import React, { useState } from 'react'
import Pagina from '../../components/Pagina'
import ApiDeputados from "../../ApiConnect/axiosAPIDeputados";
import ItemGaleria from "@/components/ItemGaleria";
import { Button, Card, Modal } from 'react-bootstrap';

const Index = ({ Deputados }) => {
    const [show, setShow] = useState(false);

    const HandleClose = () => setShow(false);
    const HandleShow = () => setShow(true);


    return (
        <>
            <Pagina titulo="Câmara Legislativa - Atividade 7" title="Deputados">
                <Button variant="primary" onClick={HandleShow}>
                    Atividade proposta
                </Button>
                <Modal show={show} onHide={HandleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Atividade 7 - Construção de front-end</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Usar a api de deputados:


                        api: https://dadosabertos.camara.leg.br/swagger/api.html
                        baseURL: https://dadosabertos.camara.leg.br/api/v2

                        <br />
                        <br />
                        1 - Criar um projeto chamado revisao
                        <br />
                        <br />
                        2 - Criar uma página com a listagem de todos os deputados, conforme imagem1
                        <br />
                        <br />
                        3 - Ao cicar em um deputado, ir para a página de detalhes, conforme imagem2
                        <br />
                        <br />
                        <Card.Img variant="top" src="https://cdn.discordapp.com/attachments/780615034816036897/1130147573794087062/mMEhqkrk43hOoprQTKagDRCKu5lgWqchmjKFCUjYW_T7Z2fHt_b49ojfzz1KLAnNeeF9Tk7si-wPPPsw1919-h929.png" style={{ height: '14rem' }} />
                        <br />
                        <br />
                        <Card.Img variant="top" src="https://cdn.discordapp.com/attachments/780615034816036897/1130147648918274078/q-XVe-Yxewyq3i9DuR6Jc5vII6JZmJaia9xnNf1HKbTpZ9GxLKXB-K0W7j0UdMO561NCb-wZmpKF3p4w1919-h929.png" style={{ height: '14rem' }} />
                    </Modal.Body>
                </Modal>

                <ItemGaleria
                    rowMd={4}
                    titleText="Câmara Legislativa"
                    arrayName={Deputados}
                    photoName="urlFoto"
                    titleName="nome"
                    linkId="id"
                    linkName="deputados"
                    linkPlaceHolder="Detalhes"
                />
            </Pagina>

        </>
    )
}

export default Index


export async function getServerSideProps(context) {
    const resultadoDeputados = await ApiDeputados.get('/deputados')
    const Deputados = resultadoDeputados.data.dados

    return {
        props: { Deputados },
    }
}