import React from 'react';
import './Card.css'
import { useNavigate } from 'react-router-dom';

const Card = ({ member, onNameClick }) => {
    const handleNameClick = async () => {
        const token = localStorage.getItem('token'); // Get the JWT token from local storage

        const response = await fetch(`http://localhost:8000/ehr/fetch/?username=${member.email}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const navigate = useNavigate();

        if (response.ok) {
            // Handle successful response here
            onNameClick(member.name);
            navigate('/timeline');
        } else {
            // Handle error here
        }
    };

    return (
        <div className="card">
            <div className='Nameptag'> <p onClick={handleNameClick}>{member.name}</p></div>
            <div className='SexPtag'><p>{member.sex}</p></div>
            <div className='DOBPtag'><p>{member.dob}</p></div>
            <div className='InsuraceIdPtag'><p>{member.email}</p></div>
        </div>
    );
};

export default Card;