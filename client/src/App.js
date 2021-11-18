//Main folder
// Common components
import Header from './components/common/Header'
import Footer from './components/common/Footer'


import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './components/css/App.css'
import React, {Fragment} from 'react'

// Pages
import Home from './components/pages/Home'
import About from './components/pages/About'
import Register from './components/pages/Register'
import Users from './components/pages/Users'
import Login from './components/pages/Login'
import Terms from './components/pages/Terms'
import Privacy from './components/pages/Privacy'

import FoodDetails from "./components/pages/Food/FoodDetails";
import RestaurantMenu from "./components/pages/Food/RestaurantMenu";
import EditRestaurant from "./components/pages/Food/EditRestaurant";
import AddRestaurant from './components/pages/Food/AddRestaurant'




function App() {
  return (
      <Fragment>
        <Header/>
          <Router>
            <Switch>
              <Route exact path='/' component={Home}></Route>
              <Route exact path='/about' component={About}></Route>
              <Route exact path='/users' component={Users}></Route>
              <Route exact path='/Restaurant' component={RestaurantMenu}></Route>
{/* authentication */}
              <Route exact path='/register' component={Register}></Route>
              <Route exact path='/login' component={Login}></Route>
{/* privacy/terms */}
              <Route exact path='/privacy' component={Privacy}></Route>
              <Route exact path='/terms' component={Terms}></Route>
{/* Food */}
              <Route exact path='/restaurant' component={FoodDetails}></Route>
              <Route exact path='/restaurant/:id' component={FoodDetails}></Route>
              <Route exact path='/addrestaurant' component={AddRestaurant}></Route>
              <Route exact path='/editrestaurant/:id' component={EditRestaurant}></Route>
            </Switch>
          </Router>
          <br></br>
        <Footer/>
      </Fragment>



  );
}

export default App;
