import React from "react";
import DatadridComponent from "../Components/Datagrid/Datagrid";
import Icon from "@material-ui/core/Icon";

class Datagrid extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filterText: props.filterText || "",
            columns:props.columns || [],
            data: props.data || [],
            dropDownValue: props.columns.filter(col=>col.default)[0],
            toggle: false
        }
        this.handleFilter = this.handleFilter.bind(this);
        this.columnHandler = this.columnHandler.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    handleFilter(e){
        this.setState({
            filterText: e.target.value
        });
    }
    columnHandler(dropDownValue){
        this.setState({
            dropDownValue,
            toggle: !this.state.toggle
        });
    }
    toggle(){
        this.setState({
            toggle: !this.state.toggle
        });
    }
  render() {
      const {noOfRowsOptions, hasFooter} = this.props;
      const {columns, dropDownValue, toggle, filterText } = this.state;
      let {data} = this.state;
      if(filterText){
          data=data.filter(filter=> filter[dropDownValue.elementcode].toString().toLowerCase().includes(filterText.toString().toLowerCase()));
      }
      const columnsDropDown = columns.map(col => {
        return (
          <li
            className="eachColumn"
            onClick={() => this.columnHandler(col)}
            key={col.elementcode}
          >
            {col.label}
          </li>
        );
      });
    return (
      <div className="dataGridWrapper">
        <div className="filterDataGrid">
          <input className="columnsInputValues" placeholder={`search by ${dropDownValue.label.toLowerCase()}`} type="text" value={this.state.filterText} onChange={this.handleFilter}/>
          <div className="columnDropDownWrapper">
            <div className="viewValue" onClick={this.toggle}>
            <span className="columnsDefaultValue">{dropDownValue.label}</span>
            {!toggle ? (
                <Icon className="dropDownIcon">expand_more</Icon>
              ) : (
                <Icon className="dropUpIcon">expand_less</Icon>
              )}
            </div>
            {
              toggle && <ul className="columnsDropDownOptions">{columnsDropDown}</ul>
            }
          </div>
        </div>
        <DatadridComponent
          columns={columns}
          data={data}
          hasFooter={hasFooter}
          noOfRowsOptions={noOfRowsOptions}
        />
      </div>
    );
  }
}
export default Datagrid;
