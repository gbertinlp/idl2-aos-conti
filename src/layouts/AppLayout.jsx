import React from 'react';
import './AppLayout.css';
import {Outlet} from "react-router-dom";
const AppLayout = () => {
    return (
        <main>
            <div className='app-container'>
                <Outlet />
            </div>
        </main>
    );
};

export default AppLayout;