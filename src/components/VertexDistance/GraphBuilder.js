import { useState } from "react";
import { Container, Col, Row, Alert, Button } from "react-bootstrap";

const GraphBuilder = ({ vertices, setVertices, edges, setEdges }) => {
  const [show, setShow] = useState(false);
  const [lastVertex, setLastVertex] = useState(null); // Último vértice selecionado
  const radius = 20; // Raio dos vértices (círculos)

  // Calcula a orientação de três pontos
  const orientation = (p, q, r) => {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0; // Colineares
    return val > 0 ? 1 : 2; // Horário ou anti-horário
  };

  // Verifica se um ponto está em um segmento
  const onSegment = (p, q, r) => {
    return (
      q.x <= Math.max(p.x, r.x) &&
      q.x >= Math.min(p.x, r.x) &&
      q.y <= Math.max(p.y, r.y) &&
      q.y >= Math.min(p.y, r.y)
    );
  };

  // Verifica se duas linhas se cruzam
  const checkIntersection = (line1, line2) => {
    const { start: p1, end: p2 } = line1;
    const { start: q1, end: q2 } = line2;

    // Ignorar interseções se as linhas compartilham um ponto final
    if (
      (p1.x === q1.x && p1.y === q1.y) ||
      (p1.x === q2.x && p1.y === q2.y) ||
      (p2.x === q1.x && p2.y === q1.y) ||
      (p2.x === q2.x && p2.y === q2.y)
    ) {
      return false;
    }

    // Calcula as orientações
    const o1 = orientation(p1, p2, q1);
    const o2 = orientation(p1, p2, q2);
    const o3 = orientation(q1, q2, p1);
    const o4 = orientation(q1, q2, p2);

    // Caso 1: Orientações diferentes (interseção)
    if (o1 !== o2 && o3 !== o4) return true;

    // Caso 2: Os pontos são colineares e sobrepostos em um dos segmentos
    if (o1 === 0 && onSegment(p1, q1, p2)) return true;
    if (o2 === 0 && onSegment(p1, q2, p2)) return true;
    if (o3 === 0 && onSegment(q1, p1, q2)) return true;
    if (o4 === 0 && onSegment(q1, p2, q2)) return true;

    return false;
  };

  // Função para calcular a distância entre dois pontos
  const calculateDistance = (start, end) => {
    return Math.sqrt(
      Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
    );
  };

  // Função para adicionar um vértice ao clicar
  const handleClick = (e) => {
    if (e.button === 0) {
      const container = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - container.left;
      const y = e.clientY - container.top;

      // Adiciona um novo vértice
      setVertices([...vertices, { id: vertices.length + 1, x, y }]);
      setLastVertex(null); // Restaura o último vértice
    }
  };

  // Função para adicionar uma aresta ao clicar com o botão direito
  const handleRightClick = (e) => {
    e.preventDefault();
    const container = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - container.left;
    const y = e.clientY - container.top;

    // Verifica se o clique está sobre um vértice existente
    const clickedVertex = vertices.find(
      (v) =>
        Math.sqrt(Math.pow(v.x - x, 2) + Math.pow(v.y - y, 2)) <= radius
    );

    if (clickedVertex) {
      if (lastVertex && lastVertex.id !== clickedVertex.id) {
        // Verifica se a nova aresta cruza alguma existente
        const newEdge = {
          start: lastVertex,
          end: clickedVertex,
          length: calculateDistance(lastVertex, clickedVertex), // Adiciona o comprimento
          vertices: [lastVertex.id, clickedVertex.id], // Adiciona os ids dos vértices conectados
        };

        const hasIntersection = edges.some((edge) =>
          checkIntersection(newEdge, edge)
        );

        if (!hasIntersection) {
          // Adiciona a nova aresta se não houver interseções
          setEdges([...edges, newEdge]);
        } else {
          setShow(true);
        }
      }
      setLastVertex(clickedVertex);
    }
  };

  return (
    <Container>
      <Col>
        <Row>
          <Alert show={show} variant="warning">
            <Alert.Heading>Aviso</Alert.Heading>
            <p>'Não é possível criar uma linha que cruza com outra!'</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={() => setShow(false)} variant="outline-success">
                Close me
              </Button>
            </div>
          </Alert>
        </Row>
        <Row>
          <div
            className="bg-white position-relative border"
            style={{
              width: "1200px",
              height: "800px",
              margin: "20px auto",
              overflow: "hidden",
            }}
            onClick={handleClick}
            onContextMenu={handleRightClick}
          >
            {/* Renderiza os vértices */}
            {vertices.map((vertex) => (
              <div key={vertex.id}>
                {/* Identificador do vértice */}
                <div
                  style={{
                    position: "absolute",
                    top: vertex.y - radius - 10,
                    left: vertex.x - radius / 2,
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "center",
                    width: radius,
                  }}
                >
                  {vertex.id}
                </div>
                {/* Círculo do vértice */}
                <div
                  style={{
                    position: "absolute",
                    top: vertex.y - radius / 2,
                    left: vertex.x - radius / 2,
                    width: radius,
                    height: radius,
                    backgroundColor: "blue",
                    borderRadius: "50%",
                  }}
                />
              </div>
            ))}

            {/* Renderiza as arestas */}
            {edges.map((edge, index) => (
              <svg
                key={index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  pointerEvents: "none",
                }}
                width="100%"
                height="100%"
              >
                <line
                  x1={edge.start.x}
                  y1={edge.start.y}
                  x2={edge.end.x}
                  y2={edge.end.y}
                  stroke="black"
                  strokeWidth={2}
                />
                {/* Exibe o comprimento da aresta */}
                <text
                  x={(edge.start.x + edge.end.x) / 2}
                  y={(edge.start.y + edge.end.y) / 2}
                  fill="black"
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {edge.length.toFixed(2)}
                </text>
              </svg>
            ))}
          </div>
        </Row>
      </Col>
    </Container>
  );
};

export default GraphBuilder;
