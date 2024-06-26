import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/Wat_Suthiwararam_School_Crest.png';
import '../styles/responsive.css';
import '../styles/manage.css';
import Swal from 'sweetalert2';

function Manage() {
    const [userData, setUserData] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const userID = location.state ? location.state.userID : null;

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/'); // Redirect to home if no token is found
            } else {
                try {
                    // Optionally you can verify the token with the server
                    const response = await axios.get(`http://localhost:3001/user/${userID}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUserData(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    navigate('/'); // Redirect to home if any error occurs
                }
            }
        };

        checkAuth();
    }, [navigate, userID]);

    const handleExchangePoints = async (pointType) => {
        const { value: pointToExchange } = await Swal.fire({
            title: 'แลกคะแนน',
            input: 'number',
            inputLabel: 'จำนวนคะแนนที่ต้องการแลก',
            inputPlaceholder: 'กรุณาใส่จำนวนคะแนน',
            inputAttributes: {
                min: 0,
                max: userData.totalPoint,
                step: 10 // Step 10 for multiples of 10
            },
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก',
            confirmButtonText: 'ยืนยัน',
            inputValidator: (value) => {
                if (!value) {
                    return 'กรุณาใส่จำนวนคะแนนที่ต้องการแลก';
                }
                if (value > userData.totalPoint) {
                    return 'คุณมีคะแนนไม่เพียงพอที่จะแลก';
                }
                if (value % 10 !== 0) {
                    return 'จำนวนคะแนนที่แลกต้องเป็นจำนวนเต็มของ 10';
                }
            }
        });

        if (pointToExchange) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`http://localhost:3001/user/exchange/${userID}`, {
                    points: parseInt(pointToExchange),
                    pointType: pointType
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }   
                });

                // Update user data after successful exchange
                setUserData(response.data.updatedUser);
                Swal.fire({
                    icon: 'success',
                    title: 'แลกคะแนนสำเร็จ!',
                    text: `คุณได้แลก ${pointToExchange / 10} คะแนน ${pointType === 'behavior' ? 'พฤติกรรม' : 'จิตอาสา'}`
                });

            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการแลกคะแนน:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด!',
                    text: 'ไม่สามารถแลกคะแนนได้ในขณะนี้'
                });
            }
        }
    };

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
                navigate('/'); // Redirect to home after popup closes
            }
        });
    };

    return (
        <div>

            <div className="container-manage">

            <header id="home-manage">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="" />
                    </Link>
                </div>
                <input type="checkbox" id="nav_check" hidden />
                <nav>
                    <div className="logo">
                        <img src={Logo} alt="" />
                    </div>
                    <ul>
                        <li><a href="#">home</a></li>
                        <li><a href="#about">about</a></li>
                        <li><Link to="/manage">manage</Link></li>
                        <li><a href="#">manual</a></li>
                        <li className='active'><Link onClick={handleClick}>Logout</Link></li>
                    </ul>
                </nav>

                <label htmlFor="nav_check" className="hamburger">
                    <div></div>
                    <div></div>
                    <div></div>
                </label>

            </header>
            <div className="dataMain">
                <p><strong>ชื่อ-สกุล : </strong>{userData.name}</p>
                <p><strong>เลขประจำตัว : </strong>{userData.ID}</p>
            </div>

            <div className="content-main">
                <div className="totalPoint">
                    <p>All your point.</p>
                    <div className="bottomContent">
                        <img src={Logo} alt="" />
                    </div>

                    <div className="showPoint">
                        <h1>{userData.totalPoint}<strong> Pt</strong></h1>
                    </div>

                    <div className="pointMain">
                        <p><strong>คะแนนพฤติกรรม : </strong> {userData.behavior}<strong> Pt</strong></p>
                        <p><strong>คะแนนจิตอาสา : </strong> {userData.volunteer}<strong> Pt</strong></p>
                    </div>

                    <div className="condition">
                        <p><span>*</span>คะแนนที่แสดง ณ ที่นี้จะไม่ได้แสดงคะแนนที่รวมกับระบบโรงเรียน</p>
                    </div>
                </div>
            </div>
            <div className="buttonExchange">
                <button className="button-1" onClick={() => handleExchangePoints('behavior')}>
                    <span>แลกคะแนน</span>
                    <h1>พฤติกรรม</h1>
                </button>
                <button className="button-2" onClick={() => handleExchangePoints('volunteer')}>
                    <span>แลกคะแนน</span>
                    <h1>จิตอาสา</h1>
                </button>
            </div>
            </div>
        </div>
    );
}

export default Manage;
