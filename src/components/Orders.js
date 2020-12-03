import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCount } from '../action/refreshAction';
import { useDispatch,useSelector } from 'react-redux';



toast.configure();

const Orders = () =>{
    const count = useSelector(state=>state.count);
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
        axios.get('https://my-first-resturant.herokuapp.com/orders/')
            .then(res=>{
                setOrders(res.data.orders);
            })
            .catch(err=>{
                console.log(err);
            });
    },[count]);
    const handleDelete = (id) =>{
        axios.delete('https://my-first-resturant.herokuapp.com/orders/'+id)
            .then(res=>{
                toast.success('Order Deleted',{position:toast.POSITION.BOTTOM_RIGHT})
                dispatch(addCount());
            })
            .catch(err=>{
                toast.error('Error',{position:toast.POSITION.BOTTOM_RIGHT});
            })
    }

    return(
        <div className="section order">
                <h1 className="section-title">Orders</h1>
                <table className="product-table">
                    <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Order Time</th>
                        <th>Name</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                    {
                        orders.length===0?<tr><td>No Data</td></tr>:
                        orders.map((item,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{item._id}</td>
                                    <td>{item.date}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.total}</td>
                                    <td><button onClick={()=>handleDelete(item._id)} className="product-table-btn">Delete</button></td>
                                </tr>
                            );
                        })
                    }  
                    </tbody>
                </table>
        </div>
    );
}

export default Orders;