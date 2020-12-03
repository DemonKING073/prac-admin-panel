import {BrowserRouter as Router,Switch,Route, Redirect} from 'react-router-dom';
import HomePage from './HomePage';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import refreshReducer from './reducer/refreshReducer';
import LoginPage from './LoginPage';
import { createBrowserHistory } from 'history';


const store = createStore(refreshReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {
  const history = createBrowserHistory({forceRefresh:true});
  const Token = localStorage.getItem('isLoggedAdmin')
  return (
    <Provider store={store}>
        <Router history={history}>
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
