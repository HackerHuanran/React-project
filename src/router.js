import React, { Component } from 'react';
import {BrowserRouter , Route ,Switch} from 'react-router-dom';
import App from './App';
import Login from './pages/Login/index';
import Index from './pages/Index/index';
import Userlist from './pages/User/list';
import Home from './pages/Home/index';
import Rolelist from './pages/role/list';
import Menulist from './pages/Menulist/list';
import Noerror from './pages/Noerror/index';

class IRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <App>
          <Switch>
            <Route exact path='/login' component={Login}/>
            <Route path='/' render={()=>
                <Index>
                    <Switch>
                      <Route exact path='/' component={Home}/>   
                      <Route path='/user/list' component={Userlist}/>
                      <Route path='/role/list' component={Rolelist}/> 
                      <Route path='/menu/list' component={Menulist}/>  
                      <Route component={Noerror}/> 
                    </Switch>
                </Index>
            }/>
          </Switch>
        </App>
      </BrowserRouter>
    )
  }
}
export default IRouter;