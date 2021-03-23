import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateProfile from "./pages/Create.Profile";
import CreateExperience from "./pages/Create.Experience";
import CreateEducation from "./pages/Create.Education";
import Profiles from "./pages/Profiles";
import Posts from "./pages/Posts";
import AddPost from "./pages/Create.Post";
import { AUTH_SERVICE } from "./api/service";
import { loadUser, authError, logout } from "./redux/actions/actions";
import { useDispatch } from "react-redux";
import PrivateRoute from "./auth/private.route";
import { getAuthToken } from "./auth/auth.token";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await AUTH_SERVICE();
        dispatch(loadUser(res.data));
      } catch (error) {
        if (error) {
          dispatch(authError());
        }
      }
    };
    fetchUser();

    const cleanUp = () => {
      if (!getAuthToken()) dispatch(logout());
    };

    window.addEventListener("storage", cleanUp());

    return () => window.removeEventListener("storage", cleanUp());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/create-profile" component={CreateProfile} />
        <PrivateRoute path="/add-experience" component={CreateExperience} />
        <PrivateRoute path="/add-education" component={CreateEducation} />
        <PrivateRoute path="/profiles" component={Profiles} />
        <PrivateRoute path="/posts" component={Posts} />
        <PrivateRoute path="/add-post" component={AddPost} />
      </Switch>
    </Router>
  );
};

export default App;
