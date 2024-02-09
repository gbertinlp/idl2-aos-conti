// Dashboard.jsx

import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import useAuth from "../../hooks/useAuth.jsx";

const Dashboard = () => {
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { cerrarSessionAuth } = useAuth();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(
                    'https://api.unsplash.com/photos/?client_id=wqFxaKEP5kuj6sZj09Ktn6v2lR1glTBCJYWBeKifGRA&per_page=5'
                );

                if (response.ok) {
                    const data = await response.json();
                    setImages(data);
                } else {
                    console.error('Error fetching images');
                }
            } catch (error) {
                console.error('Error fetching images', error);
            }
        };

        fetchImages();
    }, []);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="dashboard-container">
            <div className='dashboard__info'>
                <h2 className='dashboard__title'>Images iContinental</h2>
                <button onClick={cerrarSessionAuth} className='dashboard__button'>Cerrar System</button>
            </div>

            <div className="carousel">
                <button onClick={handlePrevImage} className='dashboard__button-img'>Previous</button>
                <img src={images[currentImageIndex]?.urls?.regular} alt="Dashboard"/>
                <button onClick={handleNextImage} className='dashboard__button-img'>Next</button>
            </div>

        </div>
    );
};

export default Dashboard;
