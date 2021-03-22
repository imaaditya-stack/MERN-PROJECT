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
import { Container } from "react-bootstrap";
import { AUTH_SERVICE } from "./api/service";
import { setUser } from "./redux/actions/actions";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await AUTH_SERVICE();
        dispatch(setUser(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Container>
        <Switch>
          <Route path="/" component={Landing} exact />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/create-profile" component={CreateProfile} />
          <Route path="/add-experience" component={CreateExperience} />
          <Route path="/add-education" component={CreateEducation} />
          <Route path="/profiles" component={Profiles} />
          <Route path="/posts" component={Posts} />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
