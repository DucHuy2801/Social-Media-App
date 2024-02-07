import React, { useContext } from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MessageIcon from '@mui/icons-material/Message';
import { Link } from 'react-router-dom';
import './navBar.scss'
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';

const NavBar = () => {

    const { toggle, darkMode } = useContext(DarkModeContext)
    const { currentUser } = useContext(AuthContext)

    return (
        <div className='navbar'>
            <div className="left">
                <Link to="/" style={{textDecoration: 'none'}}> 
                    <span>JTGo Social</span>
                </Link>
                <HomeOutlinedIcon />
                { darkMode ? <DarkModeOutlinedIcon onClick={toggle}/> : <WbSunnyOutlinedIcon onClick={toggle}/> }
                <GridViewOutlinedIcon />
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search..." />
                </div>
            </div>
            <div className="right">
                <PersonOutlinedIcon />
                <MessageIcon />
                <NotificationsOutlinedIcon/>
                <div className="user">
                    <img src={currentUser.profilePic} alt=""/>
                    <span> {currentUser.name} </span>
                </div>
            </div>
        </div>
    )
}

export default NavBar;