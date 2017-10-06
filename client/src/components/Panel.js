import React from "react";

const Panel = props =>
	<div className="panel panel-default">
    <div style={{"backgroundColor": "#20315A", "color": "white" }} className="panel-heading">
        <h3 className="panel-title text-center"><strong><i className={props.icon}></i> {props.heading}</strong></h3>
    </div>
    <div className="panel-body">
      {props.children}
    </div>
  </div>;

export default Panel;
