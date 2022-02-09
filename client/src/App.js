//Main folder
// Common components
import Header from './components/common/Header'
import Footer from './components/common/Footer'


import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './components/css/App.css'
import React from 'react'

// Pages
import Home from './components/pages/Home'
import About from './components/pages/About'


import Signup from './components/pages/Auth/Signup'
import Dashboard from './components/pages/Auth/Dashboard'
import Login from './components/pages/Auth/Login'
import Terms from './components/pages/Terms'
import Privacy from './components/pages/Privacy'


import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import RestaurantDetails from "./components/pages/Restaurant/RestaurantDetails";
import RestaurantMenu from "./components/pages/Restaurant/RestaurantMenu";
import EditRestaurant from "./components/pages/Restaurant/EditRestaurant";
import AddRestaurant from './components/pages/Restaurant/AddRestaurant'
import NotFound from './components/pages/NotFound'


// Users
import UserMenu from './components/pages/Users/UserMenu'


function App() {
  return (
      <div>
        <Router>
        <AuthProvider>
        <Header/>       
            <Switch>
              <Route exact path='/' component={Home}></Route>
              <Route exact path='/about' component={About}></Route>
              <Route exact path='/Restaurant' component={RestaurantMenu}></Route>
              <Route exact path='/users' component={UserMenu}></Route>

{/* authentication */}
                  <Route exact path='/signup' component={Signup}></Route>
                  <Route exact path='/login' component={Login}></Route>
                  <ProtectedRoute exact path='/dashboard' component={Dashboard}></ProtectedRoute>
{/* privacy/terms */}
              <Route exact path='/privacy' component={Privacy}></Route>
              <Route exact path='/terms' component={Terms}></Route>
{/* Food */}
              <Route exact path='/restaurant' component={RestaurantDetails}></Route>
              <Route exact path='/restaurant/:id' component={RestaurantDetails}></Route>
              <Route exact path='/addrestaurant' component={AddRestaurant}></Route>
              <Route exact path='/editrestaurant/:id' component={EditRestaurant}></Route>
{/* Not found */}
              <Route exact path='/notFound' component={NotFound}></Route>

            </Switch> 
        <Footer/>
      </AuthProvider>
        </Router>
    

      </div>

  );
}

export default App;
