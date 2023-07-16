import { Card, Container, Table } from "react-bootstrap"
import ApiDeputados from "../../ApiConnect/axiosAPIDeputados"
import Pagina from "@/components/Pagina"
import { dateFormatter } from "../../functions/functions";
import { BiBookAlt } from "react-icons/bi"
import Link from "next/link"

const index = ({ Deputado, GastosDeputado, profissoesDeputado }) => {
  return (
    <>
      <Pagina titulo={Deputado.nomeCivil} title="Deputados" navBarLink="/deputados">
        <Container>
          <div className="d-flex">
            <div className="mt-3">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" title={Deputado.nomeCivil} src={Deputado["ultimoStatus"].urlFoto} />
                <Card.Body>
                  <Card.Title>{Deputado.nomeCivil}</Card.Title>
                  <p><strong>Partido:</strong> {Deputado["ultimoStatus"].siglaPartido}</p>
                  <p><strong>Uf Partido:</strong> {Deputado["ultimoStatus"].siglaUf}</p>
                </Card.Body>
              </Card>
              <Link class="btn btn-danger mt-2" href="/deputados">Voltar</Link>
            </div>


            <div className="flex-column mt-3 px-5">
              <h2>Despesas</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>NF</th>
                  </tr>
                </thead>
                <tbody>
                  {GastosDeputado.map(item => (
                    <tr key={item.numDocumento}>
                      <td>{dateFormatter(item.dataDocumento)}</td>
                      <td>{item.tipoDespesa}</td>
                      <td>R$ {item.valorDocumento}</td>
                      <td>
                        {item.urlDocumento &&
                          <a href={item.urlDocumento} target="_blank"><BiBookAlt /></a>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>


            <div className="flex-column mt-3 px-2">
              <h2>Profissões</h2>
              <ul>
                {profissoesDeputado.map(item => (
                  <li key={Math.random()}>{item.titulo}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Pagina>

    </>
  )
}

export default index


export async function getServerSideProps(context) {
  const id = context.params.id

  const resultadoDeputado = await ApiDeputados.get(`/deputados/${id}`)
  const Deputado = resultadoDeputado.data.dados

  const resultadoGastosDeputado = await ApiDeputados.get(`/deputados/${id}/despesas`)
  const GastosDeputado = resultadoGastosDeputado.data.dados

  const resultadoprofissoesDeputado = await ApiDeputados.get(`/deputados/${id}/profissoes`)
  const profissoesDeputado = resultadoprofissoesDeputado.data.dados

  return {
    props: { Deputado, GastosDeputado, profissoesDeputado },
  }
}