import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Timelinecard.css'

const TimelineCard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
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
                    setLoading(false);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleNavigation = () => {
        navigate('/main'); 
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='maindiv' onClick={handleNavigation}>
               
            {data.map((item, index) => (
            <div key={index}>
                <div className="wrappercontainer">
                    <div 
                        className='TimelineCard' 
                        onClick={() => localStorage.setItem('ehr_id', item.id)} 
                        >
                        <p className='TimelinePTag'>Title: {item.name}</p>
                        <p className='TimelinePTag'>Description: {item.description}</p>
                        <p className='TimelinePTag'>Created at: {item.created_at}</p>
                    </div>          
                </div>
            </div>
            ))}
        </div>
    );
};

export default TimelineCard;