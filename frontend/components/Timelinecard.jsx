import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Timelinecard.css'

const TimelineCard = ({ data }) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/document'); // replace '/document' with the path you want to navigate to
    }

    return (
        <div className='maindiv' onClick={handleNavigation}>
            <div className='timelinebar'></div>   
            <div className='TimelineCard'>
                <p>{data.date}</p>
                <p>{data.label1}</p>
                <p>{data.label2}</p>
                <p>{data.label3}</p>
                <p>File uploaded: {data.fileUploaded ? 'Yes' : 'No'}</p>
            </div>
        </div>
    );
};

export default TimelineCard;