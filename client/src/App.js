import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Redirect from "./components/Redirect";
import Form from "./components/Form";
function App() {
  //let { id } = useParams();
  return (
    <Router>
      <div className="app-wrapper">
        <Switch>
          <Route exact path="/:id" component={Redirect} />
          <Route component={Form} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
