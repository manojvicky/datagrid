import React from "react";
import Footer from "./Footer/Footer";
import Databody from "./Databody/Databody";
class Datagrid extends React.Component {
    constructor(props){
        super(props);
        this.state={
            pageNumber: props && props.defaultpPageNumber || 1,
            rowsPerPage: 500
        }
    }
    render() {
        const {columns, data} = this.props;
        const {rowsPerPage} = this.state;
        return (
        <div className="wrapper">
           <Databody columns={columns} data={data} rowsPerPage={rowsPerPage}/>
           {
                this.props.hasFooter && <Footer rowsPerPage={500} pageNumber={this.state.pageNumber} noOfRowsOptions={[500, 1000]} rows={data.length}/>
            }
        </div>
        );
    }
}
export default Datagrid;
