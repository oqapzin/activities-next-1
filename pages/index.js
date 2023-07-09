import 'bootstrap/dist/css/bootstrap.min.css';
import Pagina from '../components/Pagina'
import Item from '../components/Item';
import { Col, Row } from 'react-bootstrap';

const index = () => {
  return (
    <div>
      <Pagina titulo="Página Inicial" title="Project QAP - NextJS">

        <div>
          <p>Projetos desenvolvidos durante as aulas de construção de front-end</p>
        </div>

        <Row md={4}>
          <Col>
            <Item titulo="Filmes" foto="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb54B4HNIUvKTs87zmsL4YMzmIIL4JiRddlxYR5ClPyZaSyu2KeFe6vYABmLSbzTShB9w&usqp=CAU" linkName="films" initialStyle="true"></Item>
          </Col>
          <Col>
            <Item titulo="Séries" foto="https://png.pngtree.com/png-clipart/20220116/original/pngtree-linear-cartoon-color-retro-tv-series-png-image_7113201.png" linkName="series" initialStyle="true"></Item>
          </Col>
          <Col>
            <Item titulo="Deputados" foto="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu-Mhtq_bxPumqnaGPgnxcgr4eSoOlmL_Rtw&usqp=CAU" linkName="deputados" initialStyle="true"></Item>
          </Col>
          <Col>
            <Item titulo="Array" foto="https://hpneo.dev/assets/images/arrays-js.png" linkName="array" initialStyle="true"></Item>
          </Col>
        </Row>
      </Pagina>

    </div>
  )
}

export default index