import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Timelinecard.css'

const TimelineCard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');
            const response = await fetch(`http://localhost:8000/ehr/fetch/?username=${email}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setData(data);
                console.log(data);
            } else {
                // Handle error here
            }
        };

        fetchData();
    }, []);

    const handleNavigation = () => {
        navigate('/document'); // replace '/document' with the path you want to navigate to
    }

    return (
        <div className='maindiv' onClick={handleNavigation}>
            <div className='timelinebar'></div>   
            <div className='TimelineCard'>
                <p>{data?.date}</p>
                <p>{data?.name}</p>
                <p>{data?.description}</p>
                <p>{data?.labels}</p>
                <p>File uploaded: {data?.fileUploaded ? 'Yes' : 'No'}</p>
            </div>
        </div>
    );
};

export default TimelineCard;