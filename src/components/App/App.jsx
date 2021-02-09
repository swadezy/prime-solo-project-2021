import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import AddLock from '../AddLock/AddLock';
import ViewLocks from '../ViewLocks/ViewLocks';
import AddPicking from '../AddPicking/AddPicking';
import ViewHistory from '../ViewHistory/ViewHistory';
import LockDetails from '../LockDetails/LockDetails';
import LockEdit from '../LockEdit/LockEdit';
import PickingDetails from '../PickingDetails/PickingDetails';

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          {/* Sean adding here */}
          <ProtectedRoute
            // logged in shows AddLock else shows LoginPage
            exact
            path="/addLock"
          >
            <AddLock />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ViewLocks else shows LoginPage
            exact
            path="/viewLocks"
          >
            <ViewLocks />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AddPicking else shows LoginPage
            exact
            path="/addPicking"
          >
            <AddPicking />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ViewHistory else shows LoginPage
            exact
            path="/viewHistory"
          >
            <ViewHistory />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows dedicated LockDetails else shows LoginPage
            exact
            path="/details/:id"
          >
            <LockDetails />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows dedicated LockEdit else shows LoginPage
            exact
            path="/edit/:id"
          >
            <LockEdit />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows dedicated LockEdit else shows LoginPage
            exact
            path="/pickDetails/:id"
          >
            <PickingDetails />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/user"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/user"
          >
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LandingPage at "/home"
            exact
            path="/home"
            authRedirect="/user"
          >
            <LandingPage />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
