import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../components/App';
import NotFoundPage from '../page/NotFoundPage';

const AppRouter = () => (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={App} exact={true} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
  
  export default AppRouter;