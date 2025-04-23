import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployee, createEmployee, updateEmployee } from '../api/employeeApi'; // Sửa lại để thêm `createEmployee`
import EmployeeForm from '../components/EmployeeForm';

function EmployeeFormPage() {
    const { id } = useParams(); // Lấy ID từ URL
    const [formData, setFormData] = useState({ fullName: '', email: '', position: '' });
    const [isEditing, setIsEditing] = useState(false); // Kiểm tra xem là sửa hay tạo mới
    const navigate = useNavigate();

    // Nếu có ID, fetch thông tin nhân viên để sửa
    useEffect(() => {
        if (id) {
            setIsEditing(true); // Nếu có ID, bật chế độ sửa
            getEmployee(id)
                .then((response) => {
                    setFormData(response.data);
                })
                .catch((err) => {
                    console.error("Error fetching employee:", err);
                });
        }
    }, [id]);

    // Xử lý thay đổi thông tin trong form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Xử lý khi gửi form (Thêm mới hoặc sửa nhân viên)
    const handleSubmit = (e) => {
        e.preventDefault();

        // Nếu là sửa, gọi API updateEmployee, nếu là tạo mới, gọi API createEmployee
        if (isEditing) {
            updateEmployee(id, formData)
                .then(() => {
                    navigate('/'); // Quay lại danh sách sau khi sửa
                })
                .catch((err) => {
                    console.error("Error updating employee:", err);
                });
        } else {
            createEmployee(formData)
                .then(() => {
                    navigate('/'); // Quay lại danh sách sau khi tạo mới
                })
                .catch((err) => {
                    console.error("Error creating employee:", err);
                });
        }
    };

    // Quay lại trang danh sách nhân viên
    const handleBack = () => {
        navigate('/');
    };

    return (
        <div>
            <h2>{isEditing ? 'Sửa thông tin nhân viên' : 'Thêm nhân viên mới'}</h2>
            <EmployeeForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
            <button onClick={handleBack}>Quay lại</button>
        </div>
    );
}

export default EmployeeFormPage;
