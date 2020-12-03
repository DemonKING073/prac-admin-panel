import React, {useState, useEffect} from 'react'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import axios from 'axios';


const Dashboard = () =>{
    const [ sales, setSales ] = useState(0);
    const [tCustomer, setTCustomer] = useState('');
    useEffect(()=>{
        axios.get('https://my-first-resturant.herokuapp.com/orders/lamo/sales')
            .then(res=>setSales(res.data.totalSales))
            .catch(err=>console.log(err));
        axios.get('https://my-first-resturant.herokuapp.com/orders/lamo/topcustomer')
        .then(res=>setTCustomer(res.data.topCustomer))
        .catch(err=>console.log(err));
    },[]);
    return(
        <div className="section dashboard">
                <h1 className="section-title">Dashboard</h1>
                <div className="detail-box">
                    <div className="dashboard-box">
                        <h4>Total Sales Today</h4>
                        <span>Rs. {sales}</span>
                    </div>
                    <div className="dashboard-box">
                        <h4>Total Sales Month</h4>
                        <span>Rs. {sales}</span>
                    </div>
                </div>
                <h3><StarBorderIcon style={{fontSize:20}}/>Top Customers of the Day</h3>
                <table>
                    <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Namee</th>
                        <th>Email</th>
                    </tr>
                    
                    <tr>
                        <td>{tCustomer._id}</td>
                        <td>{tCustomer.name}</td>
                        <td>{tCustomer.email}</td>
                    </tr>
                    </tbody>
                </table>
                <h3><StarBorderIcon style={{fontSize:20}}/>Top Customers of the Month</h3>
                <table>
                    <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Namee</th>
                        <th>Email</th>
                    </tr>
                    <tr>
                        <td>{tCustomer._id}</td>
                        <td>{tCustomer.name}</td>
                        <td>{tCustomer.email}</td>
                    </tr>
                    </tbody>
                </table>
        </div>
    );
}

export default Dashboard;