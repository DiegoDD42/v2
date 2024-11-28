// App.js
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from './Sidebar';
import DrawingArea from './DrawingArea';
import { Col, Row, Alert, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DragAndDrop = ({title}) => {
    const [components, setComponents] = useState([]);
    const [lines, setLines] = useState([]);
    const [show, setShow] = useState(false);

    // Função para adicionar um componente arrastado para a área de desenho
    const addComponent = (component) => {
        setComponents([...components, component]);
    };

    // Função para adicionar uma linha se ela não cruzar outras linhas
    const addLine = (start, end) => {
        const newLine = { start, end };
        
        // Verifica se a nova linha cruza com linhas existentes
        const crosses = lines.some(line => checkIntersection(line, newLine));
        if (!crosses) {
            setLines([...lines, newLine]);
        } else {
            setShow(true);
        }
    };

    // Função auxiliar para calcular a orientação
// Retorna:
// 0 -> p, q e r são colineares
// 1 -> Sentido horário
// 2 -> Sentido anti-horário
const orientation = (p, q, r) => {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0;  // Colinear
    return (val > 0) ? 1 : 2; // Horário ou Anti-horário
};

// Função auxiliar para verificar se o ponto q está na linha pr
const onSegment = (p, q, r) => {
    return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
           q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
};

// Função principal para verificar interseção entre duas linhas
const checkIntersection = (line1, line2) => {
    const { start: p1, end: p2 } = line1;
    const { start: q1, end: q2 } = line2;

    // Ignorar interseções se as linhas compartilham um ponto final
    if (
        (p1.x === q1.x && p1.y === q1.y) || // p1 == q1
        (p1.x === q2.x && p1.y === q2.y) || // p1 == q2
        (p2.x === q1.x && p2.y === q1.y) || // p2 == q1
        (p2.x === q2.x && p2.y === q2.y)    // p2 == q2
    ) {
        return false; // Não é uma interseção válida
    }

    // Calcula as orientações
    const o1 = orientation(p1, p2, q1);
    const o2 = orientation(p1, p2, q2);
    const o3 = orientation(q1, q2, p1);
    const o4 = orientation(q1, q2, p2);

    // Caso 1: Orientações diferentes (interseção)
    if (o1 !== o2 && o3 !== o4) {
        return true;
    }

    // Caso 2: Os pontos são colineares e sobrepostos em um dos segmentos
    if (o1 === 0 && onSegment(p1, q1, p2)) return true;
    if (o2 === 0 && onSegment(p1, q2, p2)) return true;
    if (o3 === 0 && onSegment(q1, p1, q2)) return true;
    if (o4 === 0 && onSegment(q1, p2, q2)) return true;

    return false; // Não há interseção
};



    return (
        <DndProvider backend={HTML5Backend}>
            <div className="d-flex">
                <Sidebar />
                <Col>
                    <Row>
                        <Alert show={show} variant='warning'>
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
                    <Row className='text-center'>
                        <h1>{title}</h1>
                    </Row>
                    <Row>
                        <DrawingArea components={components} addComponent={addComponent} lines={lines} addLine={addLine} />
                    </Row>
                </Col>
            </div>
        </DndProvider>
    );
};

export default DragAndDrop;
