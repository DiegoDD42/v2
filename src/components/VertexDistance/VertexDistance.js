import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import GraphBuilder from "./GraphBuilder";

const VertexDistance = () => {
  const [vertices, setVertices] = useState([]);
  const [edges, setEdges] = useState([]);
  const [shortestDistance, setShortestDistance] = useState(null);

  // Algoritmo de Dijkstra para encontrar o caminho mais curto entre dois vértices
  const dijkstra = (startVertexId, endVertexId) => {
    const distances = {}; // Distâncias mínimas de cada vértice
    const previousVertices = {}; // Para rastrear os caminhos
    const unvisitedVertices = new Set(vertices.map((v) => v.id)); // Todos os vértices ainda não visitados

    // Inicializa as distâncias com "infinito" e o vértice de partida com 0
    vertices.forEach((vertex) => {
      distances[vertex.id] = vertex.id === startVertexId ? 0 : Infinity;
      previousVertices[vertex.id] = null;
    });

    while (unvisitedVertices.size > 0) {
      // Encontra o vértice não visitado com a menor distância
      const currentVertexId = [...unvisitedVertices].reduce((minVertexId, vertexId) => {
        return distances[vertexId] < distances[minVertexId] ? vertexId : minVertexId;
      }, [...unvisitedVertices][0]);

      if (distances[currentVertexId] === Infinity) break; // Se a menor distância for infinita, sai

      // Remove o vértice atual dos vértices não visitados
      unvisitedVertices.delete(currentVertexId);

      // Verifica as arestas conectadas ao vértice atual
      edges.forEach((edge) => {
        if (edge.start.id === currentVertexId || edge.end.id === currentVertexId) {
          const neighbor = edge.start.id === currentVertexId ? edge.end : edge.start;
          const newDist = distances[currentVertexId] + edge.length;

          // Atualiza a distância e o caminho, se encontrado um caminho mais curto
          if (newDist < distances[neighbor.id]) {
            distances[neighbor.id] = newDist;
            previousVertices[neighbor.id] = currentVertexId;
          }
        }
      });
    }

    // Reconstruir o caminho
    const path = [];
    let currentVertexId = endVertexId;
    while (previousVertices[currentVertexId]) {
      path.unshift(currentVertexId);
      currentVertexId = previousVertices[currentVertexId];
    }
    path.unshift(startVertexId);

    return { distance: distances[endVertexId], path };
  };

  // Função que é chamada ao enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    const start = parseInt(e.target.start.value); // ID do vértice de partida
    const end = parseInt(e.target.end.value); // ID do vértice de destino

    const { distance, path } = dijkstra(start, end);
    if (distance === Infinity) {
      setShortestDistance("Não há caminho entre os vértices.");
    } else {
      setShortestDistance(`Distância mais curta: ${distance}, Caminho: ${path.join(" -> ")}`);
    }
  };

  return (
    <Container fluid>
      <Row>
        {/* Coluna do formulário */}
        <Col xs={3} style={{ borderRight: "1px solid #ddd", borderTop: "1px solid #ddd", padding: "1rem" }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupStart">
              <Form.Label>Partida</Form.Label>
              <Form.Control type="number" name="start" placeholder="Digite..." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEnd">
              <Form.Label>Destino</Form.Label>
              <Form.Control type="number" name="end" placeholder="Digite..." />
            </Form.Group>
            <Button type="submit" variant="primary">
              Calcular
            </Button>
          </Form>
          <br />
          {shortestDistance && <div>{shortestDistance}</div>}
        </Col>

        {/* Coluna do GraphBuilder */}
        <Col xs={9} style={{ position: "relative", height: "100vh" }}>
          <GraphBuilder vertices={vertices} setVertices={setVertices} edges={edges} setEdges={setEdges} />
        </Col>
      </Row>
    </Container>
  );
};

export default VertexDistance;
