import React from 'react'
import Logo from '../assets/Wat_Suthiwararam_School_Crest.png'
import '../styles/Menu.css'
import { FaChartPie , FaBook , FaRegNewspaper, FaClockRotateLeft ,FaArrowRightFromBracket} from "react-icons/fa6";

function Menu() {

    
  return (
    <menu>
        <img src={Logo} alt="" />
    
    
        <ul id="mainMenu">
            <Icon icon={<FaChartPie />}/>
            <Icon icon={<FaBook />}/>
            <Icon icon={<FaRegNewspaper />}/>
            <Icon icon={<FaClockRotateLeft />}/>
        </ul>

        <ul id="lastMenu">
            <Icon icon={<FaArrowRightFromBracket/>}/>
        </ul>

    </menu>


  )
}

const Icon = ({ icon }) => (
    <li>
        <a href="#">{icon}</a>
    </li>
)

export default Menu