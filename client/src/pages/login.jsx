import React, { useState } from 'react';
import '../styles/login.css';
import '../styles/font.css';
import '../styles/system.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

function Login() {
    const [ID, setID] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleClick = () => {
                let timerInterval;
        Swal.fire({
            title: "Loading...",
            html: "",
            timer: 2000,
            timerProgressBar: false,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 20);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3001/login', { ID, password });
            console.log(response.data);
            localStorage.setItem('token', response.data.token); // Save the token to localStorage
            navigate('/manage', { state: { userID: response.data.student.ID } });
            setErrorMessage(''); // Clear error message on successful submission
        } catch (err) {
            console.error(err.response.data);
            if (err.response && err.response.status === 400) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage('Login failed');
            }
        }
    }

    return (
        <div className="container">
            <div className="content-login">
                <h2>LOGIN</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input 
                            type="number" 
                            placeholder="Student ID" 
                            required 
                            value={ID}
                            onChange={(e) => setID(e.target.value)} 
                        />
                    </div>

                    <div className="input-box">
                        <input 
                            type="password" 
                            placeholder="รหัสผ่าน (6 ตัว)" 
                            maxLength="6" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>} 
                    
                    <button className="button-23" role="button" type="submit" onClick={handleClick}>LOGIN</button>
                    <div className="register-link">
                        <p>ยังไม่มีบัญชีใช่ไหม?<Link to="/signup"> สมัครสมาชิก</Link></p>
                        <Link to="/" className='link-home'>
                            <box-icon name='arrow-back' flip='vertical' color='#ffffff' size="lg"></box-icon>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
