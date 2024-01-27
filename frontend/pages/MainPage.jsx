import React from 'react';
import Header from '../components/Header';
import LeftComponent from '../components/LeftComponent';
import RightComponent from '../components/RightComponent';
import './MainPage.css'; // Assuming you have a CSS file for MainPage

const MainPage = () => {
  return (
    <div>
      <Header />
      <div className="main-content">
        <Header/>
        <LeftComponent />
        <RightComponent />
      </div>
    </div>
  );
};

export default MainPage;
