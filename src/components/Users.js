import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCount } from '../action/refreshAction';
import { useDispatch,useSelector } from 'react-redux';

toast.configure();
const Users = () =>{
    const count = useSelector(state=>state.count);
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);

    const handleDelete= (id)=>{
        axios.delete('https://my-first-resturant.herokuapp.com/user/'+id)
            .then(res=>{
                toast.success('User Deleted successfully!',{position:toast.POSITION.BOTTOM_RIGHT});
                dispatch(addCount());
            })
            .catch(err=>{
                toast.error('Error!',{position:toast.POSITION.BOTTOM_RIGHT});
            });
    }
    useEffect(()=>{
        axios.get('https://my-first-resturant.herokuapp.com/user')
            .then(res=>{
                setUsers(res.data.Users);
            })
            .catch(err=>{
                console.log(err);
            });
    },[count]);
    return(
        <div className="section user">
            <h1 className="section-title">Users</h1>
            <table>
                <tbody>
                <tr>
                    <th>User Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                {
                    users.length===0?<tr><td>No Data</td></tr>:
                    users.map((user,index)=>{
                        return(
                            <tr key={index}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td><button onClick={()=>handleDelete(user._id)} className="product-table-btn">Delete</button></td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

export default Users;