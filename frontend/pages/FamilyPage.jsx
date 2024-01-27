// FamilyPage.jsx

import React from 'react';
import '../src/App.css';
import Sidebar from '../components/Sidebar.jsx';
import FamilyMemberList from '../components/Familymemberslist.jsx';
import Header from '../components/Header.jsx';

const FamilyPage = () => {
    return (
        <div>
            <Header />
            <Sidebar />
            <FamilyMemberList />
        </div>
    );
};

export default FamilyPage;
