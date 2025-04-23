import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeListPage from './pages/EmployeeListPage';
import EmployeeFormPage from './pages/EmployeeFormPage';
import EmployeeDetailPage from './pages/EmployeeDetailPage';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EmployeeListPage />} />
                <Route path="/create" element={<EmployeeFormPage />} />
                <Route path="/edit/:id" element={<EmployeeFormPage />} />
                <Route path="/details/:id" element={<EmployeeDetailPage />} />
            </Routes>
        </Router>
    );
}


export default App;
