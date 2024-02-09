import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";

const SystemLayout = () => {

    const { auth, cargando } = useAuth();

    // if( cargando ) return 'loading...'
    return (
        <>
            {
                auth.id
                ? (
                        <main>
                            <div className='sys-container'>
                                <Outlet/>
                            </div>
                        </main>
                    )
                : ( <Navigate to='/' />)
            }
        </>
    );
};

export default SystemLayout;