import React from 'react';

const RightComponent = () => {
    return (
        <div style={{ flex: 1, backgroundColor: '#ffffff', padding: '20px' }}>
            <button style={{ marginBottom: '10px' }}>Chatbot</button>
            <button style={{ marginBottom: '10px' }}>Actual PDF</button>
            <button style={{ marginBottom: '10px' }}>Summarizer</button>
        </div>
    );
};

export default RightComponent;
