import React from 'react';
import './Alerta.css'
const Alerta = ({ alerta }) => {
    return (
        <div className={`${alerta.error ? "alerta__message-on" : "alerta__message-off"} alerta__message`}>
            {alerta.msg}
        </div>
    );
};

export default Alerta;