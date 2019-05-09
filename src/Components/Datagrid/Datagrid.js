import React from "react";
import Footer from "./Footer/Footer";
import Databody from "./Databody/Databody";
class Datagrid extends React.Component {
    constructor(props){
        super(props);
        this.state={
            pageNumber: props && props.defaultppageNumber || 1,
            rowsPerPage: props.noOfRowsOptions.filter(item=>item.default)[0].value,
        }
        this.OptionsHandler = this.OptionsHandler.bind(this);
        this.navigation = this.navigation.bind(this);
    }
    OptionsHandler(pageNumber, value){
        this.setState({
            rowsPerPage: value,
            pageNumber
          });
    }
    
    navigation(pageNumber){
        this.setState({
            pageNumber
          });
    }
    render() {
        const {columns, data, noOfRowsOptions} = this.props;
        const {rowsPerPage, pageNumber} = this.state;
        let visibleData = [];
        for(let i=(pageNumber*rowsPerPage-rowsPerPage); i< (pageNumber*rowsPerPage>data.length ? data.length : pageNumber*rowsPerPage) ; i++ ){
            visibleData.push(data[i])
        }
        return (
        <div className="wrapper">
           <Databody columns={columns} data={visibleData} />
           {
                this.props.hasFooter && <Footer navigation={this.navigation} rowsPerPage={rowsPerPage} OptionsHandler={this.OptionsHandler} pageNumber={this.state.pageNumber} noOfRowsOptions={noOfRowsOptions} rows={data.length}/>
            }
        </div>
        );
    }
}
export default Datagrid;
