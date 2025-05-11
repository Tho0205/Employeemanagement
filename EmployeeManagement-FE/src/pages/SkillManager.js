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
        loadEmployees(); 
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
            alert("Created!");
            setSkillName('');
            loadSkills();
        } catch (err) {
            console.error("Error:", err);
            alert("Can not create!");
        }
    };

    const handleAssign = async () => {
        const selectedEmp = employees.find(e => e.fullName === selectedName);
        if (!selectedEmp) {
            alert("Employee not found");
            return;
        }

        try {
            await assignSkill(selectedEmp.id, skillId);
            alert("Asigned to " + selectedEmp.fullName);
        } catch (error) {
            if (
                error.response &&
                error.response.status === 400 &&
                error.response.data === "Skill already assigned."
            ) {
                alert("Employee's been assigned already.");
            } else {
                console.error("Eror:", error);
                alert("Succeed.");
            }
        }
    };



    return (
        <div>
            <h2>Skill Manager</h2>

            <div>
                <input
                    placeholder="Skill Name"
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                />
                <button onClick={handleCreate}>Add</button>
            </div>

            <div>
                <h3>Skill List</h3>
                <ul>
                    {skills.map((skill) => (
                        <li key={skill.id}>
                            {skill.id}. {skill.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>Assign a Skill to a Employee</h3>
                <select onChange={(e) => setSelectedName(e.target.value)} value={selectedName}>
                    <option value="">Chooose a Employee Name</option>
                    {employees.map((emp) => (
                        <option key={emp.id} value={emp.fullName}>
                            {emp.fullName}
                        </option>
                    ))}
                </select>
                <select onChange={(e) => setSkillId(e.target.value)} value={skillId}>
                    <option value="">Choose a Skill</option>
                    {skills.map((skill) => (
                        <option key={skill.id} value={skill.id}>
                            {skill.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleAssign}>Assign</button>
            </div>
        </div>
    );
}

export default SkillManager;
