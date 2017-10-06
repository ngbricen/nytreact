import React from "react";

const Jumbotron = ({ children }) =>
  <div style={{ height: 150, "backgroundColor": "#20315A", "color": "white" }} className="jumbotron">
    {children}
  </div>;

export default Jumbotron;
