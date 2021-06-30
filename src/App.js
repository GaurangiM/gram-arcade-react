import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
// import Doodle from "./pages/Doodle/Doodle";
import Mario from "./pages/Mario/Mario";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={HomePage} exact />
        {/* <Route path="/doodle" component={Doodle}/> */}
        <Route path="/mario" component={Mario} />
      </Switch>
    </div>
  );
}

export default App;
