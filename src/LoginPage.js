import React, {useState} from 'react'
import './loginpage.css';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const LoginPage = () =>{
    const initialState={
        username:'',
        password:'',
    }
    const mainUrl = window.location.href;
    const homeUrl=mainUrl.replace('/login','');


    const toHomePage = () =>{
        window.location.replace(homeUrl);
    }
    const [user, setUser] = useState(initialState);
    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = {
            userName:user.username,
            password:user.password
        }
        axios.post('https://my-first-resturant.herokuapp.com/admin/login',data)
            .then(res=>{
                toast.success('Logged Successfully!',{position:toast.POSITION.BOTTOM_RIGHT});
                localStorage.setItem('admin-token',res.data.token);
                localStorage.setItem('isLoggedAdmin',true)
                toHomePage();

            })
            .catch(err=>{
                toast.error('Authorization Failed!',{position:toast.POSITION.BOTTOM_RIGHT});
            });
    }
    return(
        <div className="section-login">
            <div className="form-box">
                <h1>Admin Login</h1>
                <div className="form">
                    <form >
                        <div className="login-input-div">
                            <PersonIcon />
                            <input onChange={(e)=>setUser({...user,username:e.target.value})} type="text" placeholder="UserName"/>
                        </div>
                        <div className="login-input-div">
                            <LockIcon />    
                            <input type="password" onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="Password"/>
                        </div>
                        <div>
                            <button onClick={handleSubmit}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;