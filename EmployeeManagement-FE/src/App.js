import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeListPage from './pages/EmployeeListPage';
import EmployeeFormPage from './pages/EmployeeFormPage';
import EmployeeDetailPage from './pages/EmployeeDetailPage';
import SkillManager from './pages/SkillManager';
import SkillStatistics from './pages/SkillStatistics';
import Navbar from './components/Navbar'; // Thêm Navbar


function App() {
    return (
        <Router>
            <Navbar />
            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<EmployeeListPage />} />
                    <Route path="/create" element={<EmployeeFormPage />} />
                    <Route path="/edit/:id" element={<EmployeeFormPage />} />
                    <Route path="/details/:id" element={<EmployeeDetailPage />} />
                    <Route path="/skills" element={<SkillManager />} />
                    <Route path="/skill-stats" element={<SkillStatistics />} />
                </Routes>
            </div>
        </Router>
    );
}


export default App;
