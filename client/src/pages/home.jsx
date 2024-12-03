import React from 'react'
import '../styles/home.css'
import '../styles/font.css'
import '../styles/responsive.css'
import Logo from '../assets/Wat_Suthiwararam_School_Crest.png'
import Main from '../assets/main-project.png'
import 'boxicons'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Home() {

    const navigate = useNavigate(); 

    const handleClick = () => {
        let timerInterval;
        Swal.fire({
          title: "Loading...",
          html: "",
          timer: 1000,
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
            navigate('login'); 
          }

        });

        
    };

    const getClick = () => {
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
            navigate('signup'); 
          }

        });
    };

    return (
        <main>
            <div className="re-home">
                <a href="#">
                <box-icon name='up-arrow-circle' color='rgba(255,255,255,0.76)' size="lg"></box-icon>
                </a>
            </div>

            <header id="home">
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
                <input type="checkbox" id="nav_check" hidden />
                <nav>
                    <div className="logo">
                        <img src={Logo} alt="" />
                    </div>
                    <ul>
                        <li><a href="#">home</a></li>
                        <li><a href="#about">about</a></li>
                        <li><Link onClick={handleClick}>Manage</Link></li>
                        <li><a href="#">manual</a></li>
                        <li><Link className="active" onClick={handleClick}>login</Link></li>
                        {/* <li><Link to="/login" className="active" onClick={handleClick}>login</Link></li> */}
                    </ul>
                </nav>
                <label htmlFor="nav_check" className="hamburger">
                    <div></div>
                    <div></div>
                    <div></div>
                </label>
            </header>

            <div className="content-head">
                <div className="bg-header">
                    <div className="obj-cc"></div>
                </div>

                <div className="text_head">
                    <h1>recycle</h1>
                    <h2>for your points</h2>
                    <p>นำขวดเปล่าขนาด 600 ml มาแลกเป็นคะแนนพฤติกรรมและ คะแนนจิตอาสา ได้แล้วที่ ณ จุดที่กำหนด โรงเรียนวัดสุทธิฯ</p>
                    <button className="button-23" onClick={getClick} >GET STARTED!</button>
                    {/* <Link to="/signup"><button className="button-23" onClick={getClick}>get started!</button></Link> */}
                </div>
                <hr />
            </div>
            <div className="container-about" id="about">
                <h1 className="st">SUTHI COMPUTER CLUB.</h1>
                <div className="content-about">
                    <img src={Main} className="img-show" />
                    <h2>
                        | Bottle X <span>คืออะไร?</span>
                    </h2>
                    <div className="img-hidden">
                    <img src={Main}/>
                    </div>
                    <p>
                        <span>Bottle X</span> โปรเจกต์ที่ชุมนุมคอมพิวเตอร์แบบพิเศษ(SCC)โรงเรียนวัดสุทธิวราราม โดยได้รับการเมตตาและสนับสนุนจากเจ้าอาวาสวัดสุทธิวราราม
                        จัดทำตู้รับขวดน้ำเพื่อนำไปแลกเป็นคะแนนพฤติกรรมและคะแนนความดีต่อไป ซึ่งมีจุดมุ่งหมายที่จะลดขยะประเภทขวดน้ำPET ที่มีการทิ้งตามสถานที่ต่างๆ 
                        ทั้งภายในโรงเรียนและ ภายนอกโรงเรียน เน้นให้นักเรียนภายในโรงเรียนเห็นคุณค่าของขวดน้ำที่ถูกทิ้งมากยิ่งขึ้น ซึ่งนักเรียนสามารถจัดการคะแนนตรวจสอบประวัติต่างๆได้ที่เว็บไซต์นี้
                    </p>
                    <a href="#"><button className="button-23" role="button">เรียนรู้เพิ่มเติม</button></a>
                </div>
            </div>
        </main>
    );
}

export default Home