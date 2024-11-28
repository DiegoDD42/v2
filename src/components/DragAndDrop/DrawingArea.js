import React, { useRef, useState } from 'react';
import { useDrop } from 'react-dnd';

const DrawingArea = ({ components, addComponent, lines, addLine }) => {
    const [firstClick, setFirstClick] = useState(null); // Armazena o primeiro clique
    const dropRef = useRef(null);

    const [, drop] = useDrop({
        accept: 'component',
        drop: (item, monitor) => {
            const offset = monitor.getClientOffset();
            const boundingRect = dropRef.current.getBoundingClientRect();
    
            if (offset) {
                addComponent({
                    id: item.id,
                    x: offset.x - boundingRect.left,
                    y: offset.y - boundingRect.top,
                    src: item.src, // Caminho dinâmico da imagem
                });
            }
        },
    });

    const handleLineCreation = (id) => {
        if (firstClick === null) {
            // Se for o primeiro clique, armazena o componente
            setFirstClick(id);
        } else {
            const start = components.find((c) => c.id === firstClick);
            const end = components.find((c) => c.id === id);

            if (start && end) {
                // Ajusta os pontos para o centro da imagem
                const startCenter = {
                    x: start.x + 50, // Supondo que a largura da imagem é 100px
                    y: start.y + 50, // Supondo que a altura da imagem é 100px
                };
                const endCenter = {
                    x: end.x + 50, // Ajuste para o centro
                    y: end.y + 50, // Ajuste para o centro
                };

                // Cria a linha entre os centros
                addLine(startCenter, endCenter);
            }
            // Reseta o estado de primeiro clique após a linha ser criada
            setFirstClick(null);
        }
    };

    return (
        <div
            ref={(node) => {
                drop(node);
                dropRef.current = node;
            }}
            className="drawing-area bg-white position-relative border"
            style={{
                width: '1200px',
                height: '800px',
                margin: '20px auto',
                overflow: 'hidden',
            }}
        >
            {components.map((component) => (
                <img
                    key={component.id}
                    src={component.src} // Usa o caminho dinâmico armazenado no estado
                    style={{
                        position: 'absolute',
                        left: component.x,
                        top: component.y,
                        cursor: 'pointer',
                    }}
                    onClick={() => handleLineCreation(component.id)}
                    alt={`Component ${component.id}`}
                />
            ))}

            {lines.map((line, index) => (
                <svg key={index} style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
                    <line
                        x1={line.start.x}
                        y1={line.start.y}
                        x2={line.end.x}
                        y2={line.end.y}
                        stroke="black"
                        strokeWidth="2"
                    />
                </svg>
            ))}
        </div>
    );
};

export default DrawingArea;
