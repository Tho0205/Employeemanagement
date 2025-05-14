import React from 'react';

function EmployeeForm({ formData, onChange, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            <label>Full Name</label>
            <input
                name="Họ tên"
                value={formData.fullName}
                onChange={onChange}
                placeholder="Full Name"
                required
            />
            <label>Email</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="Email"
                required
            />
            <label>Position</label>
            <input
                name="position"
                value={formData.position}
                onChange={onChange}
                placeholder="Position"
                required
            />
            <button type="submit">Save</button>
        </form>
    );
}

export default EmployeeForm;
