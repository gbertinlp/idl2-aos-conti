import { BrowserRouter, Routes, Route} from 'react-router-dom'
import AppLayout from "./layouts/AppLayout.jsx";
import Login from "./pages/Login/index.jsx";
import {AuthProvider} from "./context/AuthProvider.jsx";
import SystemLayout from "./layouts/SystemLayout.jsx";
import Dashboard from "./pages/Dashboard/index.jsx";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={ <AppLayout /> }>
                        <Route index element={ <Login /> } />
                    </Route>

                    <Route path='dashboard' element={ <SystemLayout /> }>
                        <Route index element={ <Dashboard /> } />
                    </Route>

                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App