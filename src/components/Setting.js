import React from 'react'
import Switch from '@material-ui/core/Switch';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch,useSelector } from 'react-redux';
import  { setStatus } from '../action/refreshAction';


toast.configure();

const Setting = () =>{
    const url = window.location.href;
    const loginUrl = url.replace('/admin/setting','/login')
    const toLoginPage = ()=>{
        window.location.replace(loginUrl);
    }
    const dispatch = useDispatch();
    const status = useSelector(state=>state.status);
    const notfiy = () =>{
        toast.success('Logged Out',{position: toast.POSITION.BOTTOM_RIGHT});
        localStorage.removeItem('admin-token');
        localStorage.removeItem('isLoggedAdmin')
        toLoginPage();
    }
    return(
        <div className="section setting">
                <h1 className="section-title">Setting</h1>
                <div className="dinner-setting">
                    <h4>Dinner's Setting</h4>
                    <span>Set Status:<Switch color="primary" onChange={()=>dispatch(setStatus())} checked={status}/></span>
                </div>
                
                <div className="dinner-setting">
                    <h4>Access Setting</h4>
                    <button onClick={()=>notfiy()}>Log out</button>
                </div>
                
        </div>
    );
}

export default Setting;