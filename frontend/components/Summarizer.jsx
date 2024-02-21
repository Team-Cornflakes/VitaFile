import React, { useEffect, useState } from 'react';
import './Summarizer.css'; 
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const Summarizer = () => {
    const [summary, setSummary] = useState(''); 

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const ehrID = localStorage.getItem('ehr_id');
            const response = await fetch(`http://localhost:8000/ehr/get/?ehr_id=${ehrID}`, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                }, 
            }); 
    
            if (response.ok) {
                const data = await response.json();
                setSummary(data.summary);
            }
        }

        fetchData(); 
    }, []);

    return (
        <div className="summarizer-container">
            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={summary} />
        </div>
    );
};

export default Summarizer;
