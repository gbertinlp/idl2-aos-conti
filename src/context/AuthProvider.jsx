import { useState, useEffect, createContext} from 'react'
import { useNavigate} from 'react-router-dom'
import clientAxios from '../config/clientAxios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)

    const navigate = useNavigate()

    // useEffect(() => {
    //     const autenticarUsuario = async () => {
    //         const token = localStorage.getItem('token')
    //         if(!token){
    //             setCargando(false)
    //             return
    //         }
    //
    //         const config = {
    //             headers: {
    //                 'x-api-key': 'api-key-ok',
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }
    //
    //         try {
    //             const { data } = await clientAxios('/password', config)
    //             setAuth(data)
    //             // navigate('/proyectos')
    //
    //         } catch (error) {
    //             setAuth({})
    //         }
    //
    //         setCargando(false)
    //
    //
    //     }
    //     autenticarUsuario()
    // }, [])

    const cerrarSessionAuth = () => {
        setAuth({})
        localStorage.removeItem('token');
    }


    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSessionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;