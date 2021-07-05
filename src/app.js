import { Container } from "@material-ui/core";
import Auth from "./components/auth/auth";
import Home from "./components/home/home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="lg">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}
