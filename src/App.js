import React from "react";
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from "react-router-dom";
// You can think of these components as "pages"
// in your app.
import PomodoroApp from "./Apps/01 Pomodoro";
import MaskedInputApp from "./Apps/02 MaskedInput";
import JSONtoCSV from "./Apps/03 JSONtoCSV";
import URLShortener from "./Apps/04 URLShortener";
import Newsletter from "./Apps/05 One time Secret";

// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

function App() {
  return (
    <Router>
      <div className="bg-custom min-h-screen text-white">
        <ul className="flex gap-2 border-b items-center py-4">
          <li>
            <Link className="no-underline p-2 text-white" to="/">Home</Link>
          </li>
          <li>
            <NavLink className="no-underline p-2 text-white" to="/pomodoro">Pomodoro</NavLink>
          </li>
          <li>
            <NavLink className="no-underline p-2 text-white" to="/masked-input">Masked Input</NavLink>
          </li>
          <li>
            <NavLink className="no-underline p-2 text-white" to="/json-to-csv">JSON to CSV</NavLink>
          </li>
          <li>
            <NavLink className="no-underline p-2 text-white" to="/url-shortener">URLShortener</NavLink>
          </li>
          <li>
            <NavLink className="no-underline p-2 text-white" to="/newsletter-subscribe">Newsletter</NavLink>
          </li>
        </ul>

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/pomodoro">
            <PomodoroApp />
          </Route>
          <Route exact path="/masked-input">
            <MaskedInputApp />
          </Route>
          <Route exact path="/json-to-csv">
            <JSONtoCSV />
          </Route>
          <Route exact path="/url-shortener">
            <URLShortener />
          </Route>
          <Route exact path="/newsletter-subscribe">
            <Newsletter />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of this components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
export default App;
