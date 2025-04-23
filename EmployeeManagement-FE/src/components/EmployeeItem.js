import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeItem({ employee, onDelete }) {
    const navigate = useNavigate();

    return (
        <tr>
            <td>{employee.fullName}</td>
            <td>{employee.email}</td>
            <td>{employee.position}</td>
            <td>
                <button onClick={() => navigate(`/edit/${employee.id}`)}>Sửa</button>
                <button onClick={() => onDelete(employee.id)}>Xoá</button>
                {/* Nút Chi tiết */}
                <button onClick={() => navigate(`/details/${employee.id}`)}>Chi tiết</button>
            </td>
        </tr>
    );
}

export default EmployeeItem;
