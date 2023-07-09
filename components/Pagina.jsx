import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { Navbar, Container, Nav, NavDropdown, Form, Button, Offcanvas } from "react-bootstrap"


const dynamicNavBar = {
  "main": [

  ],

  "Deputados": [

  ],

  "films": [
    {
      type: "simple",
      text: "Atores",
      href: "/atores"
    },

    {
      type: "simple",
      text: "Gêneros",
      href: "/generos"
    },

    {
      type: "dropdown",
      text: "Séries",
      values: [
        {
          text: "Populares",
          href: "/series/populares"
        },
        {
          text: "No Ar",
          href: "/series/noar"
        },
        {
          text: "Estreantes",
          href: "/series/estreantes"
        },
        {
          text: "Top Rated",
          href: "/series/uprated"
        }
      ]
    },

    {
      type: "dropdown",
      text: "Filmes",
      values: [
        {
          text: "Populares",
          href: "/films/populares"
        },
        {
          text: "Lançamentos",
          href: "/films/lancamentos"
        },
        {
          text: "Em cartaz",
          href: "/films/emcartaz"
        },
        {
          text: "Top Rated",
          href: "/films/toprated"
        }
      ]
    },

    {
      type: "seach",
      active: true,
      text: "qap"
    },

  ]
}



const Pagina = (props) => {
  return (
    <>
      <style type="text/css">
        {`
          .navBar {
            background: #000814;
          }

          .header {
            background: #001d3d;
            box-shadow: 0 .125rem .25rem rgba(0,0,0,1)!important;
          }

          .footer {
            background: #001d3d;
            box-shadow: .125rem 0 .25rem rgba(0,0,0,1)!important;
          }
        `}
      </style>

      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{props.title ?? "Qaproject"}</title>
      </Head>

      <Navbar variant="dark" key="lg" className='navBar' expand="lg" fixed="top">
        <Container fluid>
          <Link className="navbar-brand" href={props.navBarLink ?? "/"}>{props.navBarTitle ?? "QAPROJECT"}</Link>

          {dynamicNavBar[props.navBarItem ?? "main"].length > 0 ?
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
            : <></>}
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >


            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {dynamicNavBar[props.navBarItem ?? "main"].map(item => {
                  switch (item.type) {
                    case "simple":
                      return (<Link key={Math.random() + Math.random() / 2} className="nav-link" href={item.href}>{item.text}</Link>)
                    case "dropdown":
                      return (<NavDropdown
                        title={item.text}
                        id={`offcanvasNavbarDropdown-expand-${"lg"}`}
                        key={Math.random() + Math.random() / 3}
                      >
                        {item.values.map(item2 => (
                          <Link key={Math.random() + Math.random() / 2} className="dropdown-item" href={item2.href}>{item2.text}</Link>
                        ))}
                      </NavDropdown>)
                    case "seach":
                      if (item.active) {
                        return (<Form className="d-flex">
                          <Form.Control
                            type="search"
                            placeholder="Buscar"
                            className="me-2"
                            aria-label="Search"
                          />
                          <Button variant="outline-success">Buscar</Button>
                        </Form>)
                      }
                  }
                })}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <header className="header text-light text-center py-5 mb-5 mt-5 w-100">
        <h1>{(props.titulo) ? props.titulo : "Página sem nome"}</h1>
      </header>


      <Container>
        {props.children}
      </Container>
    </>
  )
}

export default Pagina