import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployee } from '../api/employeeApi';

function EmployeeDetailPage() {
    const { id } = useParams(); // Lấy ID từ URL
    const [employee, setEmployee] = useState(null);

    // Fetch thông tin chi tiết của nhân viên
    useEffect(() => {
        getEmployee(id)
            .then((response) => {
                setEmployee(response.data);
            })
            .catch((err) => {
                console.error("Error fetching employee details:", err);
            });
    }, [id]);

    if (!employee) {
        return <div>Do not have any Empolyee...</div>; // Hiển thị thông báo khi chưa có dữ liệu
    }

    return (
        <div>
            <h2>Detail </h2>
            <p><strong>Full Name:</strong> {employee.fullName}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Position:</strong> {employee.position}</p>
            <button onClick={() => window.history.back()}>Back</button>
        </div>
    );
}

export default EmployeeDetailPage;
