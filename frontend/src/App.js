import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';

import PageChat from './Pages/PageChat/PageChat';
import Home from './Pages/PageHome/PageHome';
import Store from './Component/Redux/Redux';


function App() {
  


  return (
  <Provider store={Store}>
    <Switch>
  <Route exact path='/' component={Home}/>
  <Route exact path='/chat/:id' component={PageChat}/>
  </Switch>
  </Provider>
  )
}

export default App;
