import React from "react";
import Datagrid from "../DataGrid/Datagrid";
import metadata from "../Configration/metadata";
import data from "../Configration/data";
import noOfRowsOptions from "../Configration/options";
const customLoggerMiddleWare = store => next => action =>{
    console.group(action.type);
    console.log("%c Prev. State", "color: orange", store.getState());
    console.log("%c Action", "color: green", store.getState());
    next(action);
    console.log("%c Next State", "color: blue", store.getState());
    console.groupEnd();
}
const App = () =>{
    return (
        <div className="app">
        <h1>Data grid</h1>
        <Datagrid columns={metadata} data={data} noOfRowsOptions={noOfRowsOptions} hasFooter/>
        </div>
      );
}
export default App;