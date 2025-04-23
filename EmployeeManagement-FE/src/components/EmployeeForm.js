import React from 'react';

function EmployeeForm({ formData, onChange, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            <input
                name="fullName"
                value={formData.fullName}
                onChange={onChange}
                placeholder="Họ tên"
                required
            />
            <input
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="Email"
                required
            />
            <input
                name="position"
                value={formData.position}
                onChange={onChange}
                placeholder="Chức vụ"
                required
            />
            <button type="submit">Lưu</button>
        </form>
    );
}

export default EmployeeForm;
