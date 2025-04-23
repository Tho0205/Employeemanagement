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
        return <div>Đang tải...</div>; // Hiển thị thông báo khi chưa có dữ liệu
    }

    return (
        <div>
            <h2>Chi tiết nhân viên</h2>
            <p><strong>Họ tên:</strong> {employee.fullName}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Chức vụ:</strong> {employee.position}</p>
            {/* Nút quay lại */}
            <button onClick={() => window.history.back()}>Quay lại</button>
        </div>
    );
}

export default EmployeeDetailPage;
