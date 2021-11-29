import HomePage from './pages/HomePage/HomePage';

import ErrorPage from './pages/404Page/ErrorPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WrapperPage from './components/WrapperPage/WrapperPage';
import ComingSoonPage from './pages/ComingSoonPage/ComingSoonPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />

        <Route path="/wrapper" component={WrapperPage} />
        <Route path="/comingsoon" component={ComingSoonPage} />
        <Route path="/orders" component={ComingSoonPage} />
        <Route path="/user/changeAvatar" component={ComingSoonPage} />
        <Route path="/user/changePassword" component={ComingSoonPage} />

        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
