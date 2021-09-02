import { Redirect, Route, Switch } from "react-router";
import { useSelector } from 'react-redux'
import Header from "./components/Header/Header.jsx"
import Movies from "./components/Movies/Movies.jsx"
import Movie from "./components/Movie/Movie.jsx"
import classes from './App.module.scss';

function App() {
  const {isLightTheme} = useSelector(state => state.Config)

  return <div className = {`
    ${classes.app}
    ${!isLightTheme && classes.app_dark}
  `}>
    <Header />
    <Switch>
      <Route path = {"/"} exact render = {() => <Movies />}/>
      <Route path = {"/movie/:id"} exact render = {() => <Movie />}/>
      <Route render={() => <Redirect to={'/'} />} />
    </Switch>
  </div>
}

export default App;
