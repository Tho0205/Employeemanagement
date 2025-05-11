
import React, { useEffect, useState } from 'react';
import { getSkillStatistics } from '../api/skillApi';

function SkillStatistics() {
    const [data, setData] = useState([]);

    useEffect(() => {
        loadStatistics();
    }, []);

    const loadStatistics = async () => {
        const res = await getSkillStatistics();
        setData(res.data);
    };

    return (
        <div>
            <h2>Skill Statics</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Skill</th>
                        <th>No Employee</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((stat, idx) => (
                        <tr key={idx}>
                            <td>{stat.skill}</td>
                            <td>{stat.employeeCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SkillStatistics;
