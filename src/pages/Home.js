import { Container, Row, Col, Card } from "react-bootstrap";

const Home = () => {
    return (
        <div>
            {/* Cabeçalho estilizado */}
            <header className="bg-primary text-white py-5">
            <Container>
                <h1 className="text-center fw-bold">Bem-vindo ao Operador de Rotas de Transporte</h1>
                <p className="text-center">Gerencie e otimize suas rotas de transporte de forma eficiente!</p>
            </Container>
            </header>

            {/* Conteúdo Principal */}
            <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={4}>
                <Card className="mb-4 shadow">
                    <Card.Body className="text-center">
                    <Card.Title className="fw-bold">Encontrador de Melhor Rota</Card.Title>
                    <Card.Text>
                        Encontre a melhor rota com base nas estações de transporte.
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
                <Col md={4}>
                <Card className="mb-4 shadow">
                    <Card.Body className="text-center">
                    <Card.Title className="fw-bold">Montador de Rotas</Card.Title>
                    <Card.Text>
                        Crie e gerencie suas rotas de forma personalizada.
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
                <Col md={4}>
                <Card className="mb-4 shadow">
                    <Card.Body className="text-center">
                    <Card.Title className="fw-bold">Matriz de Estações</Card.Title>
                    <Card.Text>
                        Visualize e organize as estações em uma matriz interativa.
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            </Container>
        </div>
    );
}
 
export default Home;