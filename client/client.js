/* eslint-disable no-underscore-dangle */
import "core-js/stable";
import "regenerator-runtime/runtime";
import "whatwg-fetch";
import React from "react";
import ReactDOM from "react-dom";
import { Helmet } from "react-helmet";
import StyleContext from "isomorphic-style-loader/StyleContext";
import App from "../src/App";

const app = document.getElementById("app");

const insertCss = (...styles) => {
  const removeCss = styles.map((style) => style._insertCss());
  return () => removeCss.forEach((dispose) => dispose());
};

// Create cache object which will inject emotion styles from cache

function Main() {
  // Remove server side styles
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      {/* Provider to help with isomorphic style loader */}
      <StyleContext.Provider value={{ insertCss }}>
        {
          // HTML head tags
        }
        <Helmet>
          <link rel="shortcut icon" href="ico" />
        </Helmet>
        <App />
      </StyleContext.Provider>
    </>
  );
}

ReactDOM.hydrate(<Main />, app);
