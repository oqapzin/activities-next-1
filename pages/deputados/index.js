import React, { useState } from 'react'
import Pagina from '../../components/Pagina'
import apiDeputados from "../ApiConnect/axiosAPIDeputados";
import ItemGaleria from "@/components/ItemGaleria";
import { Button, Card, Modal } from 'react-bootstrap';

const index = ({ Deputados }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Pagina titulo="Câmara Legislativa - Atividade 7" title="Deputados">
                <Button variant="primary" onClick={handleShow}>
                    Atividade proposta
                </Button>


                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Atividade 7 - Construção de front-end</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Usar a api de deputados:


                        api: https://dadosabertos.camara.leg.br/swagger/api.html
                        baseURL: https://dadosabertos.camara.leg.br/api/v2

                        <br />
                        <br />
                        1 - Criar um projeto chamado revisao
                        <br/>
                        <br />
                        2 - Criar uma página com a listagem de todos os deputados, conforme imagem1
                        <br />
                        <br/>
                        3 - Ao cicar em um deputado, ir para a página de detalhes, conforme imagem2
                        <br/>
                        <br/>
                        <Card.Img variant="top" src="https://lh5.googleusercontent.com/2AV95nmIG_lv_tiW78SSdZUBtBqRFoqB1Q91WpZadjYmJzV1JcMTb71KdFZK3tgrjIRXruR4q5TxMMs=w1919-h929" style={{ height: '14rem' }} />
                        <br/>
                        <br/>
                        <Card.Img variant="top" src="https://lh4.googleusercontent.com/xCQOzVnIyjF_uzgpBMzdKTlCMsUkvQBjLXjWpjPkbJVAjHSJ0IujiTHYZbYULRycQ59uEHegJTbY2h4=w1919-h929" style={{ height: '14rem' }} />
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

export default index


export async function getServerSideProps(context) {
    const resultadoDeputados = await apiDeputados.get('/deputados')
    const Deputados = resultadoDeputados.data.dados

    return {
        props: { Deputados },
    }
}