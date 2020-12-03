import React from 'react'
import { Link } from 'react-router-dom'

import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SettingsIcon from '@material-ui/icons/Settings';
import { useSelector } from 'react-redux';



const NavBar = () =>{
    const status = useSelector(state=>state.status);
    return(
        <nav>
                <div className="title-div">
                    <h2 className="title">Himawari Dinner</h2>
                </div>
                <span className={status?'status-on':'status-off'}>{status?<p>Open</p>:<p>Closed</p>}</span>
                <div className="nav-div">
                    <ul>
                        <li><DashboardIcon style={{fontSize:20, marginRight:5}}/><Link  to="/">Dashboard</Link></li>
                        <li><PeopleIcon style={{fontSize:20, marginRight:5}}/><Link to="/admin/users">Users</Link></li>
                        <li><FormatListBulletedIcon style={{fontSize:20, marginRight:5}} /><Link to="/admin/products">Products</Link></li>
                        <li><ShoppingCartIcon style={{fontSize:20, marginRight:5}}/><Link to="/admin/orders">Orders</Link></li>
                        <li><SettingsIcon style={{fontSize:20, marginRight:5}}/><Link to="/admin/setting">Setting</Link></li>
                    </ul>
                </div>
            </nav>
    );
}

export default NavBar;