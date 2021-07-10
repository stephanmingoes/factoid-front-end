import Auth from "./components/auth/auth";
import { Container } from "@material-ui/core";
import Home from "./components/home/home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import PostDetails from "./components/postDetails/postDetails";
export default function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <Navbar />

      <Container maxWidth="xl">
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" component={PostDetails} />
          <Route
            path="/auth"
            exact
            component={!user ? Auth : () => <Redirect to="/posts" />}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}
