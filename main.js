import React from "react";
import ReactDOM from "react-dom";
import Datagrid from "./src/Components/Datagrid/Datagrid";
import metadata from "./src/Configration/metadata";
import data from "./src/Configration/data";
import "./styles.css";
const noOfRowsOptions = [
  {
    value: 5,
    default: true
  },
  {
    value: 10,
    default: false
  },
  {
    value: 15,
    default: false
  },
  {
    value: 20,
    default: false
  }
]
function App() {
  return (
    <div className="app">
    <h1>Data grid</h1>
      <Datagrid columns={metadata} data={data} hasFooter noOfRowsOptions={noOfRowsOptions}/>
    </div>
  );
}


ReactDOM.render(
    <App />, document.getElementById('app')
);
