import React, { Suspense } from 'react';
import './App.css';
import {store} from "./redux/store";
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from "./routes/index";


const LoginPage = React.lazy(() => import('./routes/Login'));
const ArticlePage = React.lazy(() => import('./routes/Article'));




function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/login" component={LoginPage}/>
              <PrivateRoute path="/article" component={ArticlePage}/>
              <Route
                path="*"
                render={() => <Redirect to="/login" />}
                >
              </Route>
            </Switch>
          </Suspense>
        </Router>
        </header>
        
      </div> 
    </Provider>
  );
}

export default App;
