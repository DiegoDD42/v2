import { Container, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import './ButtonPad.css';

function ButtonPad() {
  const [show, setShow] = useState(false);
  const [listaMatriz, setListaMatriz] = useState([]);
  const [matriz, setMatriz] = useState(Array(81).fill(1)); // Matriz 9x9

  const HandleClick = (index) => {
    const novaMatriz = [...matriz];
    novaMatriz[index] = novaMatriz[index] * -1;
    setMatriz(novaMatriz);
  };

  const HandleButtonClick = () => {
    const matrizBidimensional = [];
    for (let i = 0; i < 9; i++) {
      matrizBidimensional.push(matriz.slice(i * 9, i * 9 + 9));
    }

    setListaMatriz([...listaMatriz, matrizBidimensional]);
    setMatriz(Array(81).fill(1)); // Reset da matriz
  };

  return (
    <div>
      <Container className="mt-3">
        <div className="grid-container">
          {matriz.map((valor, index) => (
            <div
              key={index}
              onClick={() => HandleClick(index)}
              className={`grid-item ${valor === -1 ? 'black' : ''}`}
            ></div>
          ))}
        </div>
        {/* Botões centralizados */}
        <Row className="justify-content-center mt-3">
          <Col xs="auto">
            <Button onClick={HandleButtonClick} className="me-2">
              Salvar Matriz
            </Button>
          </Col>
          <Col xs="auto">
            <Button onClick={() => setShow(!show)}>
              {show ? "Ocultar Matrizes" : "Mostrar Matrizes"}
            </Button>
          </Col>
        </Row>
      </Container>
        
      {/* Exibição condicional */}
      {show && (
        <>
          <h3 className="mt-4">Matrizes Salvas:</h3>
          <div className="saved-matrices">
            {listaMatriz.map((matriz, matrizIndex) => (
              <div key={matrizIndex} className="matrix-display">
                {matriz.map((linha, linhaIndex) => (
                  <div key={linhaIndex} className="matrix-row">
                    {linha.map((valor, colIndex) => (
                      <span
                        key={colIndex}
                        className="matrix-cell"
                      >
                        {valor}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ButtonPad;
