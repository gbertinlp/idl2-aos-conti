import React, {useState} from 'react';
import './LoginPage.css';
import Alerta from "../../components/Alerta.jsx";
import clientAxios from "../../config/clientAxios.jsx";
import useAuth from "../../hooks/useAuth.jsx";
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const { setAuth } = useAuth();

    const handleSubmit = async e => {
        e.preventDefault()

        if([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
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

        }catch (err){
            setAlerta({
                msg: err.response.data.msg,
                error: true
            })
        }

    }

    const { msg } = alerta;

    return (
        <div>
            <div className="login-container">
                <h2>Login</h2>

                {msg && <Alerta alerta={alerta } />}

                <form onSubmit={ handleSubmit }>
                    <div>
                        <label>Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>

                    <input type='submit' value='Iniciar Acceso'/>
                </form>
            </div>
        </div>
    );
};

export default Login;