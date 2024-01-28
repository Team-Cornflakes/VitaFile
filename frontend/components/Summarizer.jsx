import React, { useEffect, useState } from 'react';
import './Summarizer.css'; // Ensure this CSS file is properly linked for styling

const Summarizer = () => {
    const [summary, setSummary] = useState(''); // State to store the summary

    useEffect(() => {
        const fetchData = async() => {
            const token = localStorage.getItem('token');
            const ehrID = localStorage.getItem('ehr_id'); // Get the ehrID from local storage
            const response = await fetch(`http://localhost:8000/ehr/get/?ehr_id=${ehrID}`, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                }, 
            }); 
    
            if(response.ok) {
                const data = await response.json();
                setSummary(data.summary);
            }
        }

        fetchData(); // Call the fetchData function
    }, []);

    return (
        <div className="summarizer-container">
            <p>{summary}</p>
        </div>
    );
};

export default Summarizer;