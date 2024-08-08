import { NavLink } from 'react-router-dom'
import aqslogo from '../../assets/images/aqslogo.jpeg'
import { Avatar, Button, IconButton, Wrap, WrapItem } from '@chakra-ui/react'
import NotificationPanel from '../notificationPanel/NotificationPanel'
import UserInfo from '../userInfo/UserInfo'
import ToggleMenu from '../toggleMenu/ToggleMenu'
import useCustomContext from '../../context/useCustomContext'

export default function NavBar(){

    const user = JSON.parse(localStorage.getItem('user')) || {}

    const {
        notificationCount
    } = useCustomContext()

    return(
        <nav className = 'nav-bar'>

            <div className="logo-container">
                <ToggleMenu />
            </div>

            <div className="logo-container">
                <img src = { aqslogo } alt="" width = { 80 } height = { 80 } />
            </div>


            <ul className = 'nav-ul'>
                <li className = 'nav-item'>
                    <NavLink to = "/aqs/dashboard" > <i></i> <span> Dashboard </span> </NavLink>
                </li>
                <li className = 'nav-item'>
                    <NavLink to = "/aqs/task" > <i></i> <span> Tâche </span> </NavLink>
                </li>
                {
                    user.user_role?.toString().toLowerCase() == 'approving' &&
                    <li className = 'nav-item'>
                        <NavLink to = "/aqs/user" > <i></i> <span> Utilisateur </span> </NavLink>
                    </li>
                }
                <li className = 'nav-item'>
                    <NavLink to = "/aqs/profile" > <i></i> <span> Profil </span> </NavLink>
                </li>
            </ul>

            <div className="account-managment">

                <div className="nav-bar-avatar">
                    { notificationCount != 0 && <span className="notification-badge"> { notificationCount } </span>}
                    <Wrap>
                        <WrapItem><NotificationPanel /></WrapItem>
                        <WrapItem><UserInfo /></WrapItem>
                    </Wrap>
                </div>

                {/* <div className="authentication-button">
                    <Button> Se connecter </Button>
                    <Button> S'inscrire </Button>
                </div> */}

            </div>
        </nav>
    )
}