import React, {useState} from 'react';
import './Login.css';
import Alerta from "../../components/Alerta.jsx";
import clientAxios from "../../config/clientAxios.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import {useNavigate} from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault()

        if([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            // Limpiar el mensaje de error después de 5 segundos
            setTimeout(() => setAlerta({}), 3000);
            return
        }

        try{
            const { data } = await clientAxios.post('/login', {email, password},{
                // headers: {
                //     'x-api-key': 'api-key-ok',
                // }
            })
            console.log('desde data', data)
            setAlerta({})
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/dashboard')

        }catch (err){
            setAlerta({
                msg: err.response.data.msg || 'Credenciales no Autorizadas',
                error: true,
            })
            // Limpiar el mensaje de error después de 5 segundos
            setEmail('')
            setPassword('')
            setTimeout(() => setAlerta({}), 3000);
        }

    }

    const { msg } = alerta;

    return (
        <div>
            <div className="login__container">
                <h2 className='kristen'>Access Platform</h2>

                {msg && <Alerta alerta={alerta } />}

                <form onSubmit={ handleSubmit }>
                    <div>
                        <label className='login__label'>Email</label>
                        <input
                            type="email"
                            value={email}
                            className='login__input'
                            onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label className='login__label'>Password</label>
                        <input
                            type="password"
                            value={password}
                            className='login__input'
                            onChange={e => setPassword(e.target.value)}/>
                    </div>

                    <input type='submit' value='Iniciar Acceso' className='login__submit'/>
                </form>
            </div>
        </div>
    );
};

export default Login;