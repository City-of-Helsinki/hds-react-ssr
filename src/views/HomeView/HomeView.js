import React from "react";
import PropTypes from "prop-types";

const HomeView = (props) => {
  return <div>HOME</div>;
};

export default HomeView;

// Typechecking
HomeView.propTypes = {
  navigator: PropTypes.objectOf(PropTypes.any),
};

HomeView.defaultProps = {
  navigator: null,
};
