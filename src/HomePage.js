import React from 'react'
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Products from './components/Products';
import Orders from './components/Orders';
import Setting from './components/Setting';


const HomePage = () =>{
    return(
        <div className="section">
            <Router>
            <NavBar />
                <div className="white-space"></div>
                <Switch>
                    <Route path="/" exact  component={Dashboard} />
                    <Route  path="/admin/users"  component={Users} />
                    <Route path="/admin/products"  component={Products} />
                    <Route path="/admin/orders"  component={Orders} />
                    <Route path="/admin/setting"  component={Setting} />
                </Switch>
            </Router>
        </div>
    );
}

export default HomePage;