// Sidebar.js
import React from 'react';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
    const sidebarItems = [
        { id: 1, src: '/images/building-car-svgrepo-com.svg' },
        { id: 2, src: '/images/building-shield-svgrepo-com.svg' },
        { id: 3, src: '/images/church-svgrepo-com.svg' },
        { id: 4, src: '/images/farm-svgrepo-com.svg' },
        { id: 5, src: '/images/ferris-wheel-svgrepo-com.svg' },
        { id: 6, src: '/images/hospital-svgrepo-com.svg' },
        { id: 7, src: '/images/industry-windows-svgrepo-com.svg' },
        { id: 8, src: '/images/temple-svgrepo-com.svg' },
    ];
    

    return (
        <div className="sidebar bg-light p-3 d-flex flex-column" style={{ width: '200px', overflowY: 'auto', height: '100vh' }}>
            {sidebarItems.map((component) => (
                <SidebarItem key={component.id} id={component.id} src={component.src} />
            ))}
        </div>
    );
};

export default Sidebar;
