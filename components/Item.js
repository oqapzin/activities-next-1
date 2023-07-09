import React from 'react'
import { Card } from 'react-bootstrap'
import Link from 'next/link'
const Item = (props) => {
  return (
    <>
      <Card className="shadow mb-2 bg-white rounded" style={{ maxWidth: "18rem", marginBottom: '12px' }}>
        {props.initialStyle ?
          <Card.Img variant="top" src={props.foto ? props.foto : "https://cdn.discordapp.com/attachments/780615034816036897/1099187480349118626/devqap.png"} style={{ height: '14rem' }} title={props.title} />

          :
          <Card.Img variant="top" src={props.foto ? props.foto : "https://cdn.discordapp.com/attachments/780615034816036897/1099187480349118626/devqap.png"} title={props.title} />
        }
        <Card.Body>
          <Card.Title>{props.titulo ? props.titulo : "Titulo não informado"}</Card.Title>
          <Card.Text>
            {props.texto}
          </Card.Text>
        </Card.Body>

        <Card.Body>
          <Card.Text>{props.data ? props.data : <></>}</Card.Text>
        </Card.Body>

        <Link className='btn btn-outline-warning text-dark m-2' href={props.id ? `/${props.linkName}/${props.id}` : `/${props.linkName}`}>Clique aqui</Link>
      </Card>

    </>
  )
}

export default Item