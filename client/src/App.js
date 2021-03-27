import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
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
import { loadUser, logout } from "./redux/actions";
import { useDispatch } from "react-redux";
import PrivateRoute from "./auth/private.route";
import { getAuthToken } from "./auth/auth.token";
import SingleProfile from "./pages/Single.Profile";
import history from "./utils/history";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());

    window.addEventListener("storage", () => {
      if (!getAuthToken()) dispatch(logout());
    });
  }, [dispatch]);

  return (
    <Router history={history}>
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
        <PrivateRoute path="/profile" component={SingleProfile} />
        <PrivateRoute path="/posts" component={Posts} />
        <PrivateRoute path="/add-post" component={AddPost} />
      </Switch>
    </Router>
  );
};

export default App;
