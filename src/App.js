import React, { Fragment } from 'react';
import './App.css';
import Login from './Login';
import MenuAppBar from './MenuAppBar';
import Home from './Home';
import { Route } from "react-router-dom";

// import LoginButton from './LoginButton';

import {
  CssBaseline,
  withStyles,
} from '@material-ui/core';

const styles = theme => ({
  main: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
});

const App = ({ classes }) => (
  <Fragment>
    <CssBaseline />
    <MenuAppBar />
    <main className={classes.main}>
      <Route path="/" exact component={Home} />
      {/* Only Show Login page if not already logged in */}
      <Route path="/login" component={Login}></Route>
      {/* <LoginButton /> */}
    </main>
  </Fragment>
);

export default withStyles(styles)(App);


// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <MenuAppBar />
//         <Route path="/" exact component={Home} />
//         {/* Only Show Login page if not already logged in */}
//         <Route path="/login" component={Login}></Route>
//       </Router>
//     </div>
//   );
// }

// export default App;
