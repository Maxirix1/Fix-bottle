import React, { useState } from 'react'; 
import '../styles/signup.css';
import '../styles/font.css';
import '../styles/system.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [name, setName] = useState('');
    const [ID, setID] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match :<');
            return;
        }

        axios.post('http://localhost:3001/signup', { name, ID, password })
            .then(result => {
                console.log(result);
                navigate('/login');
                setErrorMessage(''); // Clear error message on successful submission
            })
            .catch(err => {
                console.error(err.response.data);
                if (err.response && err.response.status === 400) {
                    setErrorMessage(err.response.data.message);
                } else {
                    setErrorMessage('Signup failed');
                }
            });
    };

    return (
        <div className="container">
            <div className="content-regis">
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input type="text" placeholder="ชื่อ-นามสกุล (ไทย)" required 
                        onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="input-box">
                        <input type="number" placeholder="Student ID" required 
                        onChange={(e) => setID(e.target.value)} />
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="ตั้งรหัสผ่าน (6 ตัว)" maxLength="6" required 
                        onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="ยืนยันรหัสผ่าน (6 ตัว)" maxLength="6" required 
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <button className="button-23" role="button" type="submit">SIGNUP</button>
                    <div className="register-link">
                        <p>มีบัญชีแล้วใช่ไหม?<Link to="/login"> เข้าสู่ระบบ</Link></p>
                        <Link to="/" className='link-home'>
                            <box-icon name='arrow-back' flip='vertical' color='#ffffff' size="lg"></box-icon>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
``
