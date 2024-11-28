import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Main from "./pages/Main";
import './App.css';

function App() {
  return (
    <div>
      <Navbar expand={false} style={{ background: "blue" }}>
        <Container fluid>
          <Navbar.Brand className="fw-bold" style={{color: "white"}} href="/home">Operador de Rotas</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="end"
          >
            <Offcanvas.Header style={{ background: "blue" }} closeButton>
              <Offcanvas.Title className="fw-bold" style={{color: "white"}} id={`offcanvasNavbarLabel-expand-${false}`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/best-route-finder">Encontrador de Melhor Rota</Nav.Link>
                <Nav.Link href="/routes-builder">Montador de Rotas</Nav.Link>
                <Nav.Link href="/station-matrix">Matriz de Estações</Nav.Link>
                <Nav.Link href="/tree">Arvore</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <div>
        <Main />
      </div>
    </div>
  );
}

export default App;
