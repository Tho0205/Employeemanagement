import React, { useEffect, useState } from 'react';
import { getAllEmployees, deleteEmployee } from '../api/employeeApi';
import EmployeeItem from '../components/EmployeeItem';
import { Link } from 'react-router-dom';
import '../css/EmployeeListPage.css';


function EmployeeListPage() {
    const [employees, setEmployees] = useState([]);

    // Lấy danh sách nhân viên khi trang load
    useEffect(() => {
        getAllEmployees()
            .then((response) => {
                setEmployees(response.data); // Gán danh sách nhân viên vào state
            })
            .catch((err) => {
                console.error("Error fetching employees:", err);
            });
    }, []);

    // Xử lý khi xoá nhân viên
    const handleDelete = (id) => {
        deleteEmployee(id)
            .then(() => {
                setEmployees(employees.filter(emp => emp.id !== id)); // Cập nhật lại danh sách sau khi xoá
            })
            .catch((err) => console.error("Error deleting employee:", err));
    };

    return (
        <div>
            <h2>Employee List</h2>

            <Link to="/create">
                <button>Create</button>
            </Link>

            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <EmployeeItem
                            key={employee.id}
                            employee={employee}
                            onDelete={handleDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeListPage;
