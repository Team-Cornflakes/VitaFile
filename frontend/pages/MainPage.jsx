import React from 'react';
import LeftComponent from '../components/LeftComponent'; // Adjust the path as necessary
import RightComponent from '../components/RightComponent'; // Adjust the path as necessary

const MainPage = () => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <LeftComponent />
            <RightComponent />
        </div>
    );
};

export default MainPage;
