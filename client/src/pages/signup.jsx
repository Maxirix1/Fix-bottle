import React, { useState } from 'react'; 
import '../styles/signup.css';
import '../styles/font.css';
import '../styles/system.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [idNo, setIdNo] = useState('');
    const [idCard, setIdCard] = useState('');
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
    
        axios.post('http://localhost:3001/signup', { student: { idNo, idCard, password } })
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
                        <input type="number" value={idNo} placeholder="เลขประจำตัวนักเรียน" maxLength="5" required onChange={(e) => setIdNo(e.target.value)} />
                    </div>

                    <div className="input-box">
                        <input type="number" value={idCard} placeholder="เลขบัตรประชาชน" maxLength="13" required onChange={(e) => setIdCard(e.target.value)} />
                    </div>

                    <div className="input-box">
                        <input type="password" value={password} placeholder="ตั้งรหัสผ่าน (6 ตัว)" maxLength="6" required onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="input-box">
                        <input type="password" value={confirmPassword} placeholder="ยืนยันรหัสผ่าน (6 ตัว)" maxLength="6" required onChange={(e) => setConfirmPassword(e.target.value)} />
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
