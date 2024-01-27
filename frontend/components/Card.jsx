import React from 'react';
import './Card.css'

const Card = ({ member, onNameClick }) => {
    return (
        <div className="card">
            <div className='Nameptag'> <p onClick={() => onNameClick(member.name)}>{member.name}</p></div>
            <div className='SexPtag'><p>{member.sex}</p></div>
            <div className='DOBPtag'><p>{member.dob}</p></div>
            <div className='InsuraceIdPtag'><p>{member.email}</p></div>
        </div>
    );
};

export default Card;