import React, { useState } from 'react';
import './Familymemberlist.css'
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal'; 
import Card from './Card.jsx';

const FamilyMemberList = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [members, setMembers] = useState([]);
    const [newMember, setNewMember] = useState({name: '', sex: '', dob: '', phone: ''})
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setNewMember({...newMember, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = newMember.name;
        const password = newMember.password;
        const token = localStorage.getItem('token');

        fetch('http://localhost:8000/create_family/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });

        setModalIsOpen(false)

    }

    const handleNavigation = (name) => {
        navigate('/Timeline');
    }

    return (
        <div>
            <div className="Parent">
                <p className="Text">Medical Records</p>
                <div className="BackupDiv">
                    <div className="TotalPatients">
                       <div className='ptagdiv'><p className='familyname'>Your Family</p></div> 
                        <div className='buttondiv'>
                            <button type='button' className='Button' onClick={() => setModalIsOpen(true)}>+</button>   
                            <button type='button' className='Button2'>S</button>  
                            <button type='button' className='Button1'>?</button>  
                        </div> 
                    </div>    
                    <div className="Main">
                        <div className='headingdiv'><div className='Nameptag1'><p>Name</p></div>
                                                    <div className='SexPtag'><p>Sex</p></div>
                                                    <div className='DOBPtag'><p>Date of Birth</p></div>
                                                    <div className='InsuraceIdPtag'><p>Insurance Id</p></div>
                                                    </div>
                        {members.map((member, index) => (
                            <Card key={index} member={member} onNameClick={handleNavigation} />
                         ))}
                            
                        {/* <div className='footerdiv'><p>Family Data Monitorization</p></div> */}
                    </div>
                </div>
            </div>

            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
            className="ReactModal__Content">
                <form onSubmit={handleSubmit}>
                    <label className='LabelText'> Email 
                        <input className="myInput" type="text" name="name" value={newMember.name} onChange={handleInputChange} required />
                    </label>
                    <label className='LabelText'> Password
                        <input className="myInput" type="password" name="password" value={newMember.password} onChange={handleInputChange} required />
                    </label>
                    
                    <div className='ModalButtonDiv'><button className='modalbutton1' type="submit">Add Member</button></div>
                </form>
                
            </Modal>
        </div>  
    );
};

export default FamilyMemberList;