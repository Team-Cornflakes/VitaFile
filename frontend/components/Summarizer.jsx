import React, { useEffect, useState } from 'react';
import './Summarizer.css'; // Ensure this CSS file is properly linked for styling

const Summarizer = () => {
    const [summary, setSummary] = useState(''); // State to store the summary

    useEffect(() => {
        const ehrID = localStorage.getItem('ehr_id'); // Get the ehrID from local storage
        fetch(`http://localhost:8000/ehr/get/?id=${ehrID}`) 
            .then(response => response.json()) 
            .then(data => setSummary(data.summary)) 
            .catch(error => console.error(error)); 
    }, []); 

    return (
        <div className="summarizer-container">
            <p>{summary}</p>
        </div>
    );
};

export default Summarizer;