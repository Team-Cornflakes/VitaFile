import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const LeftComponent = ({ onTextSelect }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const ehrId = localStorage.getItem('ehr_id');

      const response = await fetch(`http://localhost:8000/ehr/get/?ehr_id=${ehrId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json(); // Use .json() if the data is a JSON object
        setData(responseData.data); // Set the 'data' field of the responseData to the state
      } else {
        console.error('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const handleTextSelect = () => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      onTextSelect(selectedText); // Use onTextSelect to handle the selected text
    }
  };

  return (
    <div className="left-container" onMouseUp={handleTextSelect}>
      <h1 className="left-container-heading">EHR</h1> {/* Add a heading */}
      <ReactMarkdown children={data} rehypePlugins={[rehypeRaw]} />
    </div>
  );
};

export default LeftComponent;