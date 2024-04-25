import PropTypes from "prop-types";
import React from "react";

const PageHandler = () => {
  return <p>PAGEHANDLER</p>;
};

PageHandler.propTypes = {
  messageId: PropTypes.string,
  page: PropTypes.string,
};

PageHandler.defaultProps = {
  messageId: "app.title",
  page: null,
};

export default PageHandler;
