import { Route, Switch } from 'react-router-dom';
import LogoIcon from '../assets/logo.svg';
import EditIntern from '../EditIntern';
import InternList from '../InternList';
import './App.css';

function App() {
  return (
    <>
      <img className="logo" src={LogoIcon} alt="arrow icon" />
      <Switch>
        <Route path="/interns/:id" exact>
          <EditIntern />
        </Route>
        <Route path="/">
          <InternList />
        </Route>
      </Switch>
    </>
  );
}

export default App;
