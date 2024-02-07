import { BrowserRouter, Routes, Route} from 'react-router-dom'
import AppLayout from "./layouts/AppLayout.jsx";
import Login from "./pages/Login/index.jsx";
import {AuthProvider} from "./context/AuthProvider.jsx";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={ <AppLayout /> }>
                        <Route index element={ <Login /> } />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App