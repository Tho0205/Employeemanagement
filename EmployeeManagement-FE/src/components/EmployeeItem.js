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
                <button onClick={() => navigate(`/edit/${employee.id}`)}>Edit</button>
                <button
                    onClick={() => {
                        if (window.confirm('Bạn có chắc chắn xoá nhân viên này?')) {
                            onDelete(employee.id);
                        }
                    }}
                >
                    Delete
                </button>
                <button onClick={() => navigate(`/details/${employee.id}`)}>Detail</button>
            </td>
        </tr>
    );
}

export default EmployeeItem;
