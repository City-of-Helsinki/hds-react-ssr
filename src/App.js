// To add css variables for hds components
import withStyles from "isomorphic-style-loader/withStyles";
import hdsStyle from "hds-design-tokens";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import appStyles from "./App.css";

import SMCookies from "./components/SMCookies/SMCookies";

import styles from "./index.css";
import DefaultLayout from "./layouts";

import isClient from "./utils";

function App() {
  // Remove the server-side injected CSS.
  useEffect(() => {
    const jssStyles = document.getElementById("jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <SMCookies />
      <div className="App">
        <Switch>
          <Route render={() => <DefaultLayout />} />
        </Switch>
      </div>
    </>
  );
}

const Wrapped = () => {
  if (isClient()) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="" component={App} />
        </Switch>
      </BrowserRouter>
    );
  }

  return (
    <Switch>
      <Route path="" component={App} />
    </Switch>
  );
};

export default withStyles(styles, appStyles, hdsStyle)(Wrapped);

// Typechecking
App.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
