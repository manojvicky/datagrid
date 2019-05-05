import React from "react";
import Header from "./Header/Header"
import Databody from "./Databody/Databody";
class Datagrid extends React.Component {
    
    render() {
        const {columns, data} = this.props;
        return (
        <div className="wrapper">
           <Databody columns={columns} data={data}/>
        </div>
        );
    }
}
export default Datagrid;
