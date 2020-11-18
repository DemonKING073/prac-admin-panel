import {BrowserRouter as Router,Switch,Route, Redirect} from 'react-router-dom';
import HomePage from './HomePage';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import refreshReducer from './reducer/refreshReducer';
import LoginPage from './LoginPage';


const store = createStore(refreshReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {
  const Token = localStorage.getItem('isLoggedAdmin')
  console.log(window.location.href)
  return (
    <Provider store={store}>
        <Router>
        <Switch>
          <Route path="/login" exact component={LoginPage}/>
          <Route path="/" render={()=>{
            if(Token){
              return(<HomePage to="/" />)
            }else{
              return(<Redirect to="/login" />)
            }
          }} />
          {/* <Route path="/" exact component={HomePage}/> */}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
