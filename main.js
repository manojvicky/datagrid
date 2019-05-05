import React from "react";
import ReactDOM from "react-dom";
import Datagrid from "./src/Components/Datagrid/Datagrid";
import metadata from "./src/Configration/metadata";
import data from "./src/Configration/data";
import "./styles.css";

function App() {
  return (
    <div className="app">
    <h1>Data grid</h1>
      <Datagrid columns={metadata} data={data} hasFooter/>
    </div>
  );
}


ReactDOM.render(
    <App />, document.getElementById('app')
);
