import React from 'react';
import { useDrag } from 'react-dnd';

const SidebarItem = ({ id, src }) => {
    const [, drag] = useDrag({
        type: 'component',
        item: { id, src }, // Inclui o caminho da imagem aqui
    });

    return (
        <img
            ref={drag}
            src={src}
            alt={`Component ${id}`}
            style={{ width: '50px', height: '50px', margin: '5px', cursor: 'grab' }}
        />
    );
};

export default SidebarItem;
