import React, { useEffect, useState } from 'react';
import { getSkills, createSkill, assignSkill } from '../api/skillApi';
import { getAllEmployees } from '../api/employeeApi';

function SkillManager() {
    const [skills, setSkills] = useState([]);
    const [skillName, setSkillName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [skillId, setSkillId] = useState('');
    const [employees, setEmployees] = useState([]);
    const [selectedName, setSelectedName] = useState('');

    useEffect(() => {
        loadSkills();
        loadEmployees(); // gọi thêm danh sách nhân viên
    }, []);

    const loadEmployees = async () => {
        const res = await getAllEmployees();
        setEmployees(res.data);
    };

    useEffect(() => {
        loadSkills();
    }, []);

    const loadSkills = async () => {
        const res = await getSkills();
        setSkills(res.data);
    };

    const handleCreate = async () => {
        try {
            await createSkill(skillName);
            alert("Đã tạo kỹ năng!");
            setSkillName('');
            loadSkills();
        } catch (err) {
            console.error("Lỗi tạo kỹ năng:", err);
            alert("Không tạo được kỹ năng!");
        }
    };

    const handleAssign = async () => {
        const selectedEmp = employees.find(e => e.fullName === selectedName);
        if (!selectedEmp) {
            alert("Không tìm thấy nhân viên");
            return;
        }

        await assignSkill(selectedEmp.id, skillId);
        alert("Đã gán kỹ năng cho " + selectedEmp.fullName);
    };


    return (
        <div>
            <h2>Quản lý kỹ năng</h2>

            <div>
                <input
                    placeholder="Tên kỹ năng"
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                />
                <button onClick={handleCreate}>Thêm kỹ năng</button>
            </div>

            <div>
                <h3>Danh sách kỹ năng</h3>
                <ul>
                    {skills.map((skill) => (
                        <li key={skill.id}>
                            {skill.id}. {skill.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>Gán kỹ năng cho nhân viên</h3>
                <select onChange={(e) => setSelectedName(e.target.value)} value={selectedName}>
                    <option value="">Chọn nhân viên</option>
                    {employees.map((emp) => (
                        <option key={emp.id} value={emp.fullName}>
                            {emp.fullName}
                        </option>
                    ))}
                </select>
                <select onChange={(e) => setSkillId(e.target.value)} value={skillId}>
                    <option value="">Chọn kỹ năng</option>
                    {skills.map((skill) => (
                        <option key={skill.id} value={skill.id}>
                            {skill.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleAssign}>Gán</button>
            </div>
        </div>
    );
}

export default SkillManager;
